import {Module} from '@nestjs/common';
import {FirebaseService} from './firebase.service';
import {FirebaseMetadataStorageProvider} from './interfaces/storage/firebase-metadata-storage.interface';

@Module({
    imports: [],
    providers: [
        FirebaseService,
        FirebaseMetadataStorageProvider,
    ]
})
export class MyFirebaseModule {}
