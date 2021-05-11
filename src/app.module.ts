import {Module, Provider, ValueProvider} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {ConfigModule} from '@nestjs/config';
import {DatabaseService} from './database/database.service';
import {MyFirebaseModule} from './firebase/my-firebase.module';
import {FirebaseMetadataStorageProvider} from './firebase/interfaces/storage/firebase-metadata-storage.interface';
import {AuthService} from './auth/auth.service';
import {FirebaseAuthStrategy} from './firebase/firebase-auth-strategy';

function provideValues(otherProviders: Provider[]): Provider[] {
    const values: ValueProvider[] = [];
    return (values as Provider[]).concat(otherProviders);
}

@Module({
    imports: [ConfigModule.forRoot(), MyFirebaseModule, UserModule],
    controllers: [AppController],
    providers: provideValues([
        AppService,
        FirebaseMetadataStorageProvider,
        DatabaseService.forFirebase(),
        AuthService.forStrategy(new FirebaseAuthStrategy()),
    ]),
})
export class AppModule {
}
