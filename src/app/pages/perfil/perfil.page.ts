import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public user: User;

  constructor(
    private serviceNavigation: NavController,
    private serviceActionSheet: ActionSheetController
    ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('mda.user'));
    if (!this.user.image) {
      this.user.image = 'https://placehold.it/220';
    }
  }

  async showOptions() {
    const actionSheet = await this.serviceActionSheet.create({
      header: 'Opções',
      buttons: [{
        text: 'Logout',
        role: 'destructive',
        icon: 'power',
        handler: () => {
          localStorage.removeItem('mda.user');
          this.serviceNavigation.navigateRoot('/login');
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
