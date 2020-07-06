import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Component({
  selector: 'app-root',
  template: '<ion-app><ion-router-outlet></ion-router-outlet></ion-app>',
})
export class AppComponent implements OnInit {
  constructor(
    public platform: Platform,
    private afMessaging: AngularFireMessaging
  ) {}

  async ngOnInit() {
    document.body.setAttribute('data-theme', 'light');
    this.afMessaging.requestToken
      .subscribe(
      (token) => { console.log(token); },
      (error) => { console.error(error); }
    );
  }
}
