import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage {

  constructor(
    private serviceNavigation: NavController,
  ) { }

  goBack() {
    this.serviceNavigation.back();
  }
}
