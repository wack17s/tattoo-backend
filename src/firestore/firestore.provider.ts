import { config } from '../../config';

import { Firestore } from './firestore';

export const firestoreFactory = {
  provide: 'FIRESTORE',
  useFactory: () => {
    return new Firestore({
      privateKey: config.googleServiceAccountKey.private_key,
      projectId: config.googleServiceAccountKey.project_id,
      clientEmail: config.googleServiceAccountKey.client_email
    });
  },
};
