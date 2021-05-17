import {Controller, Get, Param, Req, UseGuards} from '@nestjs/common';
import {OrayApiService} from './oray-api/oray-api.service';
import {AuthGuard} from '../guards/auth/auth.guard';
import {Request} from 'express';
import {mergeMap} from 'rxjs/operators';

@Controller('api')
@UseGuards(AuthGuard)
export class ApiController {

    constructor(private oray: OrayApiService) {
    }

    @Get('service')
    public getServiceInfo(@Req() request: Request) {
        const {username, md5Password} = request['user'];

        return this.oray.getToken(username, md5Password).pipe(
            mergeMap((token) => this.oray.getAccountInfo(token),
        ));
    }

    @Get('networks')
    public listNetworks(@Req() request: Request) {
        const {username, md5Password} = request['user'];

        return this.oray.getToken(username, md5Password).pipe(
            mergeMap((token) => this.oray.listNetworks(token)),
        );
    }

    @Get('network/:networkid/state')
    public getNetworkState(@Param('networkid') networkId: number, @Req() request: Request) {
        const {username, md5Password} = request['user'];

        return this.oray.getToken(username, md5Password).pipe(
            mergeMap((token) => this.oray.getNetworkState(token, networkId))
        );
    }

    @Get('network/:networkid/members')
    public getNetworkMembers(@Param('networkid') networkId: number, @Req() request: Request) {
        const {username, md5Password} = request['user'];

        return this.oray.getToken(username, md5Password).pipe(
            mergeMap((token) => this.oray.getNetworkMembers(token, networkId)),
        )
    }

    @Get('members')
    public getAllMembers(@Req() request: Request) {
        const {username, md5Password} = request['user'];

        return this.oray.getToken(username, md5Password).pipe(
            mergeMap((token) => this.oray.getAllMembers(token)),
        )
    }
}
