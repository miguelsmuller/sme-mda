import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '@app/models/user.model';

import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sme',
  templateUrl: './sme.page.html',
  styleUrls: ['./sme.page.scss'],
})
export class SmePage {

  constructor(
    private serviceNavigation: NavController,
    private serviceActionSheet: ActionSheetController,
    private serviceFireDatabase: AngularFirestore,
    private serviceFirebaseAuth: AngularFireAuth,
  ) { }

  goBack() { this.serviceNavigation.back(); }

  async showOptions() {
    const actionSheet = await this.serviceActionSheet.create({
      header: 'Opções',
      buttons: [{
        text: 'Perfil',
        icon: 'person',
        handler: () => {
          this.serviceNavigation.navigateForward(`/tabs/perfil`);
        }
      }, {
        text: 'Logout',
        role: 'destructive',
        icon: 'power',
        handler: () => {
          this.serviceFirebaseAuth.signOut();
          localStorage.removeItem('mda.user');
          this.serviceNavigation.navigateRoot('/login');
        }
      }
    ]
    });
    await actionSheet.present();
  }
}
