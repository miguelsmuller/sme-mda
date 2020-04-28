import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, NavController, ActionSheetController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user: User;

  constructor(
    private db: AngularFirestore,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController
    ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('mda.user'));
    if (!this.user.image) {
      this.user.image = 'https://placehold.it/220';
    }
  }

  async showMessage(message: string) {
    const toast = await this.toastCtrl.create({
      message, duration: 3000, buttons: [
        {
          icon: 'send',
          handler: () => {
            this.navCtrl.navigateForward('/post');
          }
        }
      ]
    });
    toast.present();
  }

  async showOptions() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opções',
      buttons: [{
        text: 'Logout',
        role: 'destructive',
        icon: 'power',
        handler: () => {
          localStorage.removeItem('mda.user');
          this.navCtrl.navigateRoot('/login');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
      }]
    });
    await actionSheet.present();
  }

}
