import { Module } from '@nestjs/common';

import { firestoreFactory } from './firestore.provider';

@Module({
  providers: [firestoreFactory],
  exports: [firestoreFactory]
})
export class FirestoreModule {}
