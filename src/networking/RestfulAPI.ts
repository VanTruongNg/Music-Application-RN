import Axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { ParamsNetwork, ResponseBase } from 'src/models/API';
import { StyleSheet } from 'react-native';
import { TIME_OUT } from 'src/common/API';
import { endpoints } from './endpoint';
import { dispatch, getState } from 'src/common/redux';
import { encode } from 'base-64';
import { TokenResponseFields } from 'src/models/Auth';
import { appActions, authActions } from 'src/store/action-slices';

const tokenKeyHeader = 'authorization';
const rapidApiKeyHeader = 'X-RapidAPI-Key';
const rapidApiHostHeader = 'X-RapidAPI-Host';

const AxiosInstance = Axios.create({});

export const handleParameter = <T extends ParamsNetwork>(
  props: T,
  method: Method,
): AxiosRequestConfig & ParamsNetwork => {
  const { url, body, params, baseUrl, isNeedToken = true } = props;
  return {
    ...props,
    method,
    url,
    data: body,
    params,
    baseUrl,
    isNeedToken,
  };
};

AxiosInstance.interceptors.response.use(
  response => response,
  async function (error) {
    const originalRequest = error.config;
    if (
      error &&
      error.response &&
      error.response.status === 401 &&
      error.response?.data?.error?.message === 'The access token expired'
    ) {
      console.log('call refresh token');
      const newToken = await refreshToken();

      if (newToken === null) {
        return Promise.reject(error);
      }

      dispatch(authActions.onSetToken(newToken));
      console.log(originalRequest);
    }
  },
);

// refresh token
const refreshToken = async (): Promise<TokenResponseFields | null> => {
  const { env } = getState('app');

  return PostFormUrlencoded<TokenResponseFields>({
    url: endpoints.auth.token,
    body: {
      grant_type: 'client_credentials',
      client_id: env?.CLIENT_ID,
      client_secret: env?.CLIENT_SECRET,
    },
    baseUrl: env?.AUTH_URL,
  })
    .then((res: any) => res)
    .catch(e => console.log(e));
};

// base
function Request<T = Record<string, unknown>>(
  config: AxiosRequestConfig & ParamsNetwork,
) {
  const { env } = getState('app');
  const { access_token } = getState('auth');

  const defaultConfig: AxiosRequestConfig = {
    baseURL: config.baseUrl || env?.API_URL,
    timeout: TIME_OUT,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (defaultConfig.baseURL === env?.DOWNLOAD_URL) {
    defaultConfig.headers![rapidApiKeyHeader] = env?.RAPID_API_KEY;
    defaultConfig.headers![rapidApiHostHeader] = env?.RAPID_API_HOST;
  }

  if (access_token && config.isNeedToken) {
    (defaultConfig.headers as Record<string, string>)[
      tokenKeyHeader
    ] = `Bearer ${access_token}`;
  }  

  console.log('endpoint: ', `${defaultConfig.baseURL}${config.url}`);

  dispatch(appActions.onSetLoadApp(true));

  return new Promise<T | any>((rs, rj) => {
    AxiosInstance.request(StyleSheet.flatten([defaultConfig, config]))
      .then((res: AxiosResponse<T>) => {
        dispatch(appActions.onSetLoadApp(false));

        if (res === undefined && defaultConfig.baseURL === env?.DOWNLOAD_URL) {
          throw new Error('The key has expired');
        }

        const response = res?.data;
        return rs(response);
      })
      .catch((error: any) => {
        dispatch(appActions.onSetLoadApp(false));
        let err;
        if (error && error.response) {
          err = error.response;
        } else {
          err = 'Network error';
        }

        console.log(error);
        
        if (
          error.response?.status === 401 &&
          error.response?.data?.error?.message === 'The access token expired'
        ) {
          return rj(err);
        } else if (error.message === 'The key has expired') {
          return rj(error.message);
        }
      });
  });
}

// get
async function Get<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'GET'));
}

// post
async function Post<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'POST'));
}

type ParameterPostFormData = AxiosRequestConfig & ParamsNetwork;
// post FormData
async function PostFormData<T>(params: ParamsNetwork) {
  const { access_token } = getState('auth');
  const headers: AxiosRequestConfig['headers'] = {
    [tokenKeyHeader]:
      access_token && params.url !== 'oauth/token'
        ? `Bearer ${access_token}`
        : '',
    'Content-Type': 'multipart/form-data',
  };
  return Request<T>(
    handleParameter<ParameterPostFormData>({ ...params, headers }, 'POST'),
  );
}

// post FormUrlencoded
async function PostFormUrlencoded<T>(params: ParamsNetwork) {
  const { env } = getState('app');

  const credentials = `${env?.CLIENT_ID}:${env?.CLIENT_SECRET}`;
  const base64Credentials = encode(credentials);
  const authHeader = `Basic ${base64Credentials}`;

  const headers: AxiosRequestConfig['headers'] = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  if (params.url === 'api/token') headers[tokenKeyHeader] = authHeader;

  return Request<T>(
    handleParameter<ParameterPostFormData>({ ...params, headers }, 'POST'),
  );
}

// put
async function Put<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'PUT'));
}

// delete
async function Delete<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'DELETE'));
}
export type NetWorkResponseType<T> = (
  params: ParamsNetwork,
) => Promise<ResponseBase<T> | null>;

export const NetWorkService = {
  Get,
  Post,
  Put,
  Delete,
  PostFormData,
  Request,
  PostFormUrlencoded,
};
