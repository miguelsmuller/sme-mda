import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  template: '<ion-app><ion-router-outlet></ion-router-outlet></ion-app>',
})
export class AppComponent implements OnInit {
  constructor(
    public platform: Platform
  ) {}

  async ngOnInit() {
    document.body.setAttribute('data-theme', 'light');
  }
}
