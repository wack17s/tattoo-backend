import firebaseAdmin from 'firebase-admin';

import { serviceAccountKey } from './serviceAccountKey'

export class FirestoreService {
  public constructor() {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccountKey as any)
    });
  }

  private get db() {
    return firebaseAdmin.firestore();
  }

  public getAll = async <T>(collectionName: string): Promise<T[]> => {
    const snapshot = await this.db.collection(collectionName).get();

    const res = [];

    snapshot.forEach(item => {
      res.push(item.data());
    })

    return res;
  };


  public getQuery = async <T>(collectionName: string, queries : ({ key: string, value: string } | { array: string, value: string[] })[]): Promise<T[]> => {
    const collectionRef = this.db.collection(collectionName);

    let queryCollenction;

    queries.map(({ array, key, value }: any) => {
      if (key) {
        queryCollenction = collectionRef.where(key, '==', value);
      }

      if (array) {
        queryCollenction = collectionRef.where(array, 'array-contains-any', value);
      }
    })

    const snapshot = await queryCollenction.get();

    if (snapshot.empty) {
      return [];
    }  

    const res = [];

    snapshot.forEach(item => {
      res.push(item.data());
    })

    return res;
  };

  public getOne = async <T>(collectionName: string, entryId: string): Promise<T | null> => {
    const docRef = this.db.collection(collectionName).doc(entryId);

    const doc = await docRef.get();

    if (!doc.exists) {
      return null;
    }
    
    return doc.data() as T;
  }
}

export const firestoreService = new FirestoreService();
