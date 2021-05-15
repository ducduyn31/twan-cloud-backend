export interface LoginResponse {
    access_token: string;
    token: string;
    refresh_token: string;
    refresh_expires: Date;
    refresh_ttl: number;
}
