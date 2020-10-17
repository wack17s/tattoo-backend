import { serviceAccountKey } from './serviceAccountKey';

import { Firestore } from './firestore';

export const firestoreFactory = {
  provide: 'FIRESTORE',
  useFactory: () => {
    return new Firestore({
      privateKey: serviceAccountKey.private_key,
      projectId: serviceAccountKey.project_id,
      clientEmail: serviceAccountKey.client_email
    });
  },
};
