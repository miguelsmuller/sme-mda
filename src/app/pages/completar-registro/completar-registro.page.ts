import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, IonSlides } from '@ionic/angular';

import { User } from '@app/models/user.model';
import { FireBaseService } from '@app/services/firebase.service';

@Component({
  selector: 'app-completar-registro',
  templateUrl: './completar-registro.page.html',
  styleUrls: ['./completar-registro.page.scss'],
})
export class CompletarRegistroPage implements OnInit {
  @ViewChild('slides', { read: IonSlides }) slides: IonSlides;

  public form: FormGroup;

  constructor(
    private frmBuilder: FormBuilder,
    private serviceFireBase: FireBaseService,
    private serviceNavigation: NavController
  ) {
    this.form = this.frmBuilder.group({
      escola: ['', Validators.required]
    });
  }

  ngOnInit() {
  }


  goToInicio() {
    if (this.form.invalid) {
      this.slides.slideTo(1);
    } else {
      const olderUser = JSON.parse(localStorage.getItem('mda.user'));

      const user: User = {
        uid: olderUser.uid,
        name: olderUser.name,
        email: olderUser.email,
        image: olderUser.image,
        escola: this.form.controls.escola.value
      };

      localStorage.setItem('mda.user', JSON.stringify(user));

      this.serviceFireBase.addUser(user);

      this.serviceNavigation.navigateForward('/tabs/inicio');
    }
  }
}
