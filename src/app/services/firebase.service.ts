import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Arquivo } from '../models/arquivo.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {
  private arquivosCollection: AngularFirestoreCollection<Arquivo>;

  constructor(
    private fireDataBase: AngularFirestore,
    private ctrlToast: ToastController,
  ) { }

  getArquivos(ref: string): Observable<Arquivo[]> {
    this.arquivosCollection = this.fireDataBase.collection<Arquivo>('arquivos',
      dbRef => dbRef.where('ref', '==', ref).orderBy('data', 'asc'));

    return this.arquivosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Arquivo;
        const id = a.payload.doc.id;
        return { id, ...data };
      }),
      catchError((erro) => {
        this.showToast('Não foi possível recuperar as informações...');
        return throwError(erro);
      }))
    );
  }

  getUser(uid: string): Observable<User> {
    const userDocumento = this.fireDataBase.doc<User>(`users/${uid}`);
    return userDocumento.valueChanges();
  }

  addUser(user: User) {
    this.fireDataBase.collection<User>('users').doc(user.uid).set(user);
  }

  async showToast(msg: string) {
    const toast = await this.ctrlToast.create({
      message: msg,
      duration: 3500
    });
    toast.present();
  }
}
