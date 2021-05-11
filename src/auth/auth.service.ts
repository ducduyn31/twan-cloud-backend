import {AuthStrategy} from './auth-strategy';
import {Provider} from '@nestjs/common';

export class AuthService {

    register: any;

    // @ts-ignore
    constructor(private strategy: AuthStrategy){
        console.log(strategy);
        // this.register = this.strategy.register;
    }

    static forStrategy(strategy: AuthStrategy<any, any, any>): Provider {
        return {
            provide: AuthService,
            useFactory: () => new AuthService(strategy),
        }
    }
}
