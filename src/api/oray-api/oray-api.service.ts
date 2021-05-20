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
import {RemoveMemberRequest} from './interfaces/remove-member.request';
import {AddMemberRequest} from './interfaces/add-member.request';


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
        return this.http.post(`authorization?r=${Math.random()}`, {
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
        return this.http.post(`authorize/refreshing?r=${Math.random()}`, {
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
        return this.http.get(`/product/service/info?r=${Math.random()}`, {
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
        return this.http.get(`/product/network/list?r=${Math.random()}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
            baseURL: this.PGY_API_SERVER,
        }).pipe(
            map((response) => response.data)
        );
    }

    public getNetworkInfo(user: string, network: number): Observable<NetworkResponse> {
        return this.http.get(`product/network/info/${network}?r=${Math.random()}`, {
            headers: {
                authorization: user,
            },
            baseURL: this.USER_API_SERVER,
        }).pipe(
            map((response) => response.data)
        );
    }

    public getNetworkState(token: string, network: number): Observable<NetworkStatusResponse> {
        return this.http.get(`/product/network/online-state/${network}?r=${Math.random()}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
            baseURL: this.PGY_API_SERVER,
        }).pipe(
            map((response) => response.data)
        );
    }

    public getNetworkMembers(token: string, network: number): Observable<NetworkMemberResponse[]> {
        return this.http.get(`product/network/members/${network}?r=${Math.random()}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
            baseURL: this.PGY_API_SERVER,
        }).pipe(
            map((response) => response.data)
        );
    }

    public getAllMembers(token: string, requiresNotInNetwork: boolean = false): Observable<Array<HardwareMemberGeneralInfoResponse | SoftwareMemberGeneralInfoResponse>> {

        return this.http.get(`product/member/list?r=${Math.random()}${requiresNotInNetwork ? '&isnetworked=0' : ''}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
            baseURL: this.PGY_API_SERVER,
        }).pipe(
            map((response) => response.data)
        );
    }

    public getMemberDevices(token: string, memberid: string): Observable<any> {
        return this.http.get(`oraybox/device/get?r=${Math.random()}`, {
            headers: {
                authorization: `Bearer ${token}`,
                'X-Oraybox': memberid,
            },
            baseURL: this.PGY_API_SERVER,
        }).pipe(
            map((response) => response.data)
        );
    }

    public removeMemberFromNetwork(token: string, removeMemberRequest: RemoveMemberRequest): Observable<{code: number}> {
        return this.http.post(`product/network/remove-member?r=${Math.random()}`, removeMemberRequest,{
            headers: {
                authorization: `Bearer ${token}`,
            },
            baseURL: this.PGY_API_SERVER,
        }).pipe(
            map((response) => ({
                code: response.status,
            })),
        );
    }

    addMemberFromNetwork(token: string, addMemberRequest: AddMemberRequest): Observable<{code: number}> {
        return this.http.post(`product/network/add-member?r=${Math.random()}`, addMemberRequest,{
            headers: {
                authorization: `Bearer ${token}`,
            },
            baseURL: this.PGY_API_SERVER,
        }).pipe(
            map((response) => ({
                code: response.status,
            })),
        );
    }
}
