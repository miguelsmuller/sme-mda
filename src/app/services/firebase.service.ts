import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { User } from '@app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {
  constructor(
    private serviceFireDatabase: AngularFirestore,
    private serviceToast: ToastController,
  ) { }

  getUser(uid: string): Observable<User> {
    const userDocumento = this.serviceFireDatabase.doc<User>(`users/${uid}`);
    return userDocumento.valueChanges();
  }

  addUser(user: User) {
    this.serviceFireDatabase.collection<User>('users').doc(user.uid).set(user);
  }

  async showToast(msg: string) {
    const toast = await this.serviceToast.create({
      message: msg,
      duration: 3500
    });
    toast.present();
  }
}
