import {AuthStrategy} from '../auth/auth-strategy';
import * as admin from 'firebase-admin';
import * as moment from 'moment';
import {auth} from 'firebase-admin/lib/auth';
import UserRecord = auth.UserRecord;
import CreateRequest = auth.CreateRequest;

export class FirebaseAuthStrategy implements AuthStrategy<CreateRequest, UserRecord, string> {

    async verifyLogin(idToken: string): Promise<boolean> {
        try {
            const payload = await admin.auth().verifyIdToken(idToken, true);
            return !moment(payload.exp).isBefore(moment());
        } catch (error) {
            if (error.code == 'auth/id-token-revoked') {
                return false;
            }
        }
    }

    register(options: CreateRequest): Promise<UserRecord> {
        return admin.auth().createUser(options);
    }

}
