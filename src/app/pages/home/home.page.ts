import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { CommonService } from '@app/services/common.service';
import { User } from '@app/models/user.model';

import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public user: User;
  public listPrefix;
  public loadStatus = true;

  constructor(
    private serviceNavigation: NavController,
    private serviceStorage: AngularFireStorage,
    private serviceCommon: CommonService,
  ) {
    this.user = JSON.parse(localStorage.getItem('mda.user'));
  }

  ngOnInit() {
    this.serviceStorage.ref('/').listAll().subscribe(
      (data) => {
        this.listPrefix = data.prefixes;
      },
      (erro) => {
        this.loadStatus = false;
        this.serviceCommon.newAnalyticsException('FirebaseStorage Erro');
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
