import {Module, Provider} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {ConfigModule} from '@nestjs/config';
import { FirebaseService } from './firebase/firebase.service';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [UserModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, FirebaseService, DatabaseService.forFirebase()],
})
export class AppModule {}
