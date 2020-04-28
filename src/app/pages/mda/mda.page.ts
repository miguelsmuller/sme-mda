import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-mda',
  templateUrl: './mda.page.html',
  styleUrls: ['./mda.page.scss'],
})
export class MdaPage {

  constructor(
    private ctrlNav: NavController,
  ) { }

  goBack() {
    this.ctrlNav.back();
  }

}
