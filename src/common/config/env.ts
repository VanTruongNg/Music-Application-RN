export interface ENVFields {
    API_URL?: string;
    APP_ENV?: string;
    AUTH_URL?: string;
    DOWNLOAD_URL?: string;
    CODE_PUSH_KEY_ANDROID?: string;
    CODE_PUSH_KEY_IOS?: string;
    GOOGLE_IOS?: string;
    GOOGLE_WED?: string;
    CLIENT_ID?: string;
    CLIENT_SECRET?: string;
    RAPID_API_KEY?: string;
    RAPID_API_HOST?: string;
  }

  export const ENVDynamic = (env: string) => {
    const config: any = {
      Dev: {
        API_URL: 'https://api.spotify.com/',
        AUTH_URL: 'https://accounts.spotify.com/',
        DOWNLOAD_URL: 'https://spotify-scraper.p.rapidapi.com/v1/track/download',
        RAPID_API_KEY: 'Rapid-API-KEY(Spotify-Scraper)',
        RAPID_API_HOST: 'spotify-scraper.p.rapidapi.com',
        APP_ENV: 'Dev',
        CODE_PUSH_KEY_ANDROID: '----',
        CODE_PUSH_KEY_IOS: '----',
        GOOGLE_IOS: '----',
        GOOGLE_WED: '----',
        CLIENT_ID: '25fb74ba90644f7eb50ac2ab62f58b81',
        CLIENT_SECRET: '0e445cf8d77b4e21b1fc0a9766932440',
      },
    };
    return config[env];
  };
  
  export const envFlex = (env: string) => ENVDynamic(env);