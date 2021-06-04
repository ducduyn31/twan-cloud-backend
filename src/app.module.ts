import {Module, Provider, ValueProvider} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {ConfigModule} from '@nestjs/config';
import {ApiModule} from './api/api.module';

function provideValues(otherProviders: Provider[]): Provider[] {
    const values: ValueProvider[] = [];
    return (values as Provider[]).concat(otherProviders);
}

@Module({
    imports: [ConfigModule.forRoot(), UserModule, ApiModule],
    providers: provideValues([]),
})
export class AppModule {
}
