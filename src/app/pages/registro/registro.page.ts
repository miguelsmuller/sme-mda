import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';

import { User } from 'src/app/models/user.model';
import { FireBaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  public form: FormGroup;

  constructor(
    private frmBuilder: FormBuilder,
    private fireAuth: AngularFireAuth,
    private fireService: FireBaseService,
    private ctrlLoading: LoadingController,
    private ctrlNav: NavController,
    private ctrlToast: ToastController,
  ) {
    this.form = this.frmBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  goToLogin() { this.ctrlNav.navigateBack('login'); }

  async showMessage(message: string) {
    const toast = await this.ctrlToast.create({ message, duration: 3500, position: 'top' });
    toast.present();
  }

  async createUser() {
    if (this.form.valid) {
      const loading = await this.ctrlLoading.create({ message: 'Cadastrando...' });
      loading.present();

      this.fireAuth.createUserWithEmailAndPassword(this.form.controls.email.value, this.form.controls.password.value)
      .then((data) => {
        const isNewUser = data.additionalUserInfo.isNewUser;

        console.log(data.user.uid);

        const user: User = {
          uid: data.user.uid,
          name: this.form.controls.name.value,
          email: this.form.controls.email.value,
          image: null,
          escola: null
        };

        localStorage.setItem('mda.user', JSON.stringify(user));
        loading.dismiss();

        if (isNewUser) {
          this.fireService.addUser(user);
          this.ctrlNav.navigateRoot('completar-registro');
        } else {
          this.ctrlNav.navigateRoot('tabs/inicio');
        }
      })
      .catch((erro) => {
        loading.dismiss();
        this.showMessage(erro);
      });
    } else {
      this.showMessage('Preencha o cadastro corretamente.');
    }
  }
}
