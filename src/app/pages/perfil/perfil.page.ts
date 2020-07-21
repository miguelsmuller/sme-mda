import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '@app/models/user.model';

import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public user: User;
  public isAdmin = false;
  public listItems;

  constructor(
    private serviceNavigation: NavController,
    private serviceActionSheet: ActionSheetController,
    private serviceFireDatabase: AngularFirestore,
    private serviceFirebaseAuth: AngularFireAuth,
    ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('mda.user'));
    if (!this.user.image) {
      this.user.image = 'https://placehold.it/220';
    }

    if (this.user.uid === 'HlVlWTc1L9Xr7ScxgbSpcNq1Aw73') {
      this.isAdmin = true;
    }
  }

  generateList() {
    const itemsCollection  = this.serviceFireDatabase.collection<User>('users');
    this.listItems = itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );


  }
}
