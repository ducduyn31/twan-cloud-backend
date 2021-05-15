import {CacheModule, HttpModule, Module} from '@nestjs/common';
import {ApiController} from './api.controller';
import {OrayApiService} from './oray-api/oray-api.service';
import {SharedModule} from '../shared/shared.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
    imports: [HttpModule, SharedModule, CacheModule.register({
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        ttl: 30*24*60*60,
    }),],
    controllers: [ApiController],
    providers: [OrayApiService]
})
export class ApiModule {
}
