import {CACHE_MANAGER, HttpService, Inject, Injectable} from '@nestjs/common';
import {asapScheduler, Observable, of, scheduled} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {LoginResponse} from './interfaces/login-response.interface';
import {NetworkResponse} from './interfaces/network-response.interface';
import {NetworkMemberResponse} from './interfaces/network-member-response.interface';
import {Cache} from 'cache-manager';
import * as moment from 'moment';
import {TokenPayload} from './interfaces/token-payload.interface';
import {NetworkStatusResponse} from './interfaces/network-status-response.interface';
import {AccountInfoResponse} from './interfaces/account-info-response.interface';
import {HardwareMemberGeneralInfoResponse, SoftwareMemberGeneralInfoResponse} from './interfaces/member-general-info-response.interface';


@Injectable()
export class OrayApiService {

    private readonly USER_API_SERVER = 'https://user-api-v2.oray.com/';
    private readonly AUTH_API_SERVER = 'https://auth-v2.oray.com/';
    private readonly PGY_API_SERVER = 'https://pgy-api.oray.com/';

    constructor(private http: HttpService, @Inject(CACHE_MANAGER) private cache: Cache) {
        this.http.axiosRef.interceptors.request.use(config => {
            console.log(config);
            return config;
        });
    }

    public login(username: string, password: string): Observable<LoginResponse> {
        return this.http.post('authorization', {
            account: username,
            password: password,
            ismd5: true,
        }, {
            baseURL: this.USER_API_SERVER,
        }).pipe(
            map((response) => response.data),
            tap((response) => this.cache.set(username, JSON.stringify(response))),
        );
    }

    public refreshToken(oldToken: string, refreshToken: string): Observable<string> {
        return this.http.post('authorize/refreshing', {
            access_token: oldToken,
            refresh_token: refreshToken,
        }, {
            baseURL: this.AUTH_API_SERVER
        }).pipe(
            map((response) => response.data)
        );
    }

    public getToken(username: string, password: string): Observable<string> {
        const $lastToken = scheduled(this.cache.get(username), asapScheduler);
        return $lastToken.pipe(switchMap((lastTokenStr: string) => {
            if (!lastTokenStr) {
                return this.login(username, password).pipe(
                    map((response) => response.token),
                );
            }
            const lastToken: LoginResponse = JSON.parse(lastTokenStr);
            const b64TokenPayload = lastToken.token.split('.')[1];
            const tokenPayload: TokenPayload = JSON.parse(Buffer.alloc(119, b64TokenPayload, 'base64').toString());

            if (moment(tokenPayload.exp * 1000).isBefore(moment())) {
                return this.login(username, password).pipe(
                    map((response) => response.token),
                );
            }

            return of(lastToken.token);
        }));
    }

    public getAccountInfo(token: string): Observable<AccountInfoResponse> {
        return this.http.get('/product/service/info', {
            headers: {
                authorization: `Bearer ${token}`,
            },
            baseURL: this.PGY_API_SERVER,
        }).pipe(
            map((response) => ({
                ...response.data,
                expiredtime: response.data['expiredtime'] * 1000
            }))
        );

    }

    public listNetworks(token: string): Observable<NetworkResponse[]> {
        return this.http.get('/product/network/list', {
            headers: {
                authorization: `Bearer ${token}`,
            },
            baseURL: this.PGY_API_SERVER,
        }).pipe(
            map((response) => response.data)
        );
    }

    public getNetworkInfo(user: string, network: number): Observable<NetworkResponse> {
        return this.http.get(`product/network/info/${network}`, {
            headers: {
                authorization: user,
            },
            baseURL: this.USER_API_SERVER,
        }).pipe(
            map((response) => response.data)
        );
    }

    public getNetworkState(token: string, network: number): Observable<NetworkStatusResponse> {
        return this.http.get(`/product/network/online-state/${network}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
            baseURL: this.PGY_API_SERVER,
        }).pipe(
            map((response) => response.data)
        );
    }

    public getNetworkMembers(token: string, network: number): Observable<NetworkMemberResponse[]> {
        return this.http.get(`product/network/members/${network}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
            baseURL: this.PGY_API_SERVER,
        }).pipe(
            map((response) => response.data)
        );
    }

    public getAllMembers(token: string): Observable<Array<HardwareMemberGeneralInfoResponse | SoftwareMemberGeneralInfoResponse>> {
        return this.http.get(`product/member/list`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
            baseURL: this.PGY_API_SERVER,
        }).pipe(
            map((response) => response.data)
        );
    }
}
