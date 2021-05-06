import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, NavController } from '@ionic/angular';
import firebase from 'firebase/app';

import { User } from '@app/models/user.model';
import { FireBaseService } from '@app/services/firebase.service';
import { CommonService } from '@app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public form: FormGroup;

  constructor(
    private formConstructor: FormBuilder,
    private serviceFirebase: FireBaseService,
    private serviceFirebaseAuth: AngularFireAuth,
    private serviceNavigation: NavController,
    private serviceCommon: CommonService,
    private serviceLoading: LoadingController,
  ) {
    this.form = this.formConstructor.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() { }

  goToSignup() { this.serviceNavigation.navigateForward('registro'); }
  goToRecover() { this.serviceNavigation.navigateForward('registro'); }

  async signInWithPassword() {
    if (this.form.valid) {
      const loading = await this.serviceLoading.create({ message: 'Fazendo login...' });
      loading.present();

      this.serviceFirebaseAuth.signInWithEmailAndPassword(this.form.controls.email.value, this.form.controls.password.value)
      .then((data) => {
        loading.dismiss();
        this.completeActionLogin(data);
      })
      .catch(() => {
        loading.dismiss();
        this.serviceCommon.showToast('Usuário ou senha inválidos');
      });
    } else {
      this.serviceCommon.showToast('Informe seus dados de acesso.');
    }
  }

  async signInWithGoogle() {
    this.serviceFirebaseAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((data) => {
      this.completeActionLogin(data);
    })
    .catch((err) => {
      this.serviceCommon.showToast(err);
    });
  }

  completeActionLogin(data) {
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

      this.serviceFirebase.addUser(newUser);
      this.serviceNavigation.navigateRoot('completar-registro');

    } else {
      this.serviceFirebase
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

          console.log(userFromFireStore);

          localStorage.setItem('mda.user', JSON.stringify(userFromFireStore));

          this.serviceNavigation.navigateRoot('tabs/inicio');
        },
        (erro) => {
          this.serviceCommon.showToast(erro);
          console.log(erro);
        }
      );
    }
  }
}
