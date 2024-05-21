export interface ClientFields {
    client_id: string
    client_secret: string
}

export interface AuthState {
    isLogin: boolean
    isRemember: boolean
    user_data: any
    access_token: string | null
    tokenExpiration: number
}

//Login
export interface RequestTokenFields extends ClientFields {
    baseUrl: string
}

export interface TokenResponseFields {
    token_type: string
    expired_in: number
    access_token: string
}