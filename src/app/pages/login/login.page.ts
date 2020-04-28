import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';

import { User } from 'src/app/models/user.model';
import { FireBaseService } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public form: FormGroup;

  constructor(
    private frmBuilder: FormBuilder,
    private fireAuth: AngularFireAuth,
    private ctrlFireService: FireBaseService,
    private ctrlLoading: LoadingController,
    private ctrlNav: NavController,
    private ctrlToast: ToastController
  ) {
    this.form = this.frmBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (localStorage.getItem('mda.user')) {
      this.ctrlNav.navigateRoot('tabs/inicio');
    }
  }

  goToSignup() { this.ctrlNav.navigateForward('registro'); }
  goToRecover() { this.ctrlNav.navigateForward('registro'); }

  async showMessage(message: string) {
    const toast = await this.ctrlToast.create({ message, duration: 3500, position: 'top' });
    toast.present();
  }

  loginUnificado(data) {
      const isNewUser = data.additionalUserInfo.isNewUser;

      if (isNewUser) {
        const newUser: User = {
          uid: data.user.uid,
          name: data.user.displayName,
          email: data.user.email,
          image: data.user.photoURL,
          escola: null
        };

        localStorage.setItem('mda.user', JSON.stringify(newUser));

        this.ctrlFireService.addUser(newUser);
        this.ctrlNav.navigateRoot('completar-registro');

      } else {
        this.ctrlFireService
        .getUser(data.user.uid)
        .subscribe(
          (value: User) => {
            const userFromFireStore: User = {
              uid: value.uid,
              name: value.name,
              email: value.email,
              image: value.image,
              escola: value.escola,
            };

            localStorage.setItem('mda.user', JSON.stringify(userFromFireStore));

            this.ctrlNav.navigateRoot('tabs/inicio');
          },
          (erro) => {
            this.showMessage(erro);
          }
        );
      }
  }

  async signInWithPassword() {
    if (this.form.valid) {
      const loading = await this.ctrlLoading.create({ message: 'Fazendo login...' });
      loading.present();

      this.fireAuth.signInWithEmailAndPassword(this.form.controls.email.value, this.form.controls.password.value)
      .then((data) => {
        loading.dismiss();
        this.loginUnificado(data);
      })
      .catch(() => {
        loading.dismiss();
        this.showMessage('Usuário ou senha inválidos');
      });
    } else {
      this.showMessage('Informe seus dados de acesso.');
    }
  }

  async signInWithGoogle() {
    this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((data) => {
      this.loginUnificado(data);
    })
    .catch((err) => {
      this.showMessage(err);
    });
  }
}
