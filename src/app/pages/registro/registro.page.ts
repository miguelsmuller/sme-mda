import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, NavController } from '@ionic/angular';
import * as firebase from 'firebase';

import { User } from '@app/models/user.model';
import { FireBaseService } from '@app/services/firebase.service';
import { CommonService } from '@app/services/common.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  public form: FormGroup;

  constructor(
    private formConstructor: FormBuilder,
    private serviceFirebase: FireBaseService,
    private serviceFirebaseAuth: AngularFireAuth,
    private serviceLoading: LoadingController,
    private serviceNavigation: NavController,
    private serviceCommon: CommonService
  ) {
    this.form = this.formConstructor.group({
      name: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(255)]],
      email: ['', [
        Validators.required,
        Validators.email]],
      password: ['', Validators.required],
    });
  }

  goToLogin() { this.serviceNavigation.navigateBack('login'); }

  async createUser() {
    if (this.form.valid) {
      const loading = await this.serviceLoading.create({ message: 'Cadastrando...' });
      loading.present();

      this.serviceFirebaseAuth.createUserWithEmailAndPassword(this.form.controls.email.value, this.form.controls.password.value)
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
          this.serviceFirebase.addUser(user);
          this.serviceNavigation.navigateRoot('completar-registro');
        } else {
          this.serviceNavigation.navigateRoot('tabs/inicio');
        }
      })
      .catch((erro) => {
        loading.dismiss();
        this.serviceCommon.showToast(erro);
      });
    } else {
      this.serviceCommon.showToast('Preencha o cadastro corretamente.');
    }
  }
}
