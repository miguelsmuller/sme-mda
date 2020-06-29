import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { User } from 'src/app/models/user.model';

import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: User;
  listPrefix;

  constructor(
    private serviceNavigation: NavController,
    private serviceStorage: AngularFireStorage
  ) {
    this.user = JSON.parse(localStorage.getItem('mda.user'));
  }

  ngOnInit() {
    this.serviceStorage.ref('/').listAll().subscribe(
      (data) => {
        this.listPrefix = data.prefixes;
      }
    );
  }

  goToPrefix(prefix: string) {
    this.serviceNavigation.navigateForward(`/tabs/listagem`, {
      queryParams: {
        prefix
      },
    });
  }
}
