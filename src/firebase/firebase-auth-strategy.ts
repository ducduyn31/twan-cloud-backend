import {AuthStrategy} from '../auth/auth-strategy';
import * as admin from 'firebase-admin';
import * as moment from 'moment';
import {auth} from 'firebase-admin/lib/auth';
import UserRecord = auth.UserRecord;
import CreateRequest = auth.CreateRequest;
import DecodedIdToken = auth.DecodedIdToken;

export class FirebaseAuthStrategy implements AuthStrategy<CreateRequest, UserRecord, string> {

    async verifyLogin(idToken: string): Promise<DecodedIdToken | null> {
        try {
            const payload = await admin.auth().verifyIdToken(idToken, true);
            return !moment(payload.exp * 1000).isBefore(moment()) ? payload : null;
        } catch (error) {
            if (error.code == 'auth/id-token-revoked') {
                return null;
            }
        }
    }

    register(options: CreateRequest): Promise<UserRecord> {
        return admin.auth().createUser(options);
    }

    delete(options: Partial<CreateRequest>): Promise<void> {
        if (!('uid' in options)) {
            throw new TypeError('Requires user UID to delete.');
        }

        return admin.auth().deleteUser(options.uid);
    }

    async login(options: CreateRequest): Promise<string> {
        if (!('email' in options)) {
            throw new TypeError('Requires user email to get token.');
        }

        const user = await admin.auth().getUserByEmail(options.email);

        return await admin.auth().createCustomToken(user.uid);
    }

}
