import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {AuthService} from '../../auth/auth.service';
import * as admin from 'firebase-admin';
import {DatabaseService} from '../../database/database.service';
import {User} from '../../user/dto/user';
import {auth} from 'firebase-admin/lib/auth';
import DecodedIdToken = auth.DecodedIdToken;

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private db: DatabaseService) {
    }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const token = context.switchToHttp().getRequest().header('Authorization');
        const result: DecodedIdToken = await this.authService.verify(token);
        const authUser = await admin.auth().getUserByEmail(result.email);
        context.switchToHttp().getRequest().user = await this.db.getDatabase().getModel(User).findById(authUser.uid);
        return !!result;
    }
}
