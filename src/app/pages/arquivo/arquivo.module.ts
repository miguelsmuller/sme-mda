import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ArquivoPage } from './arquivo.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ArquivoPage
      }
    ])
  ],
  declarations: [ArquivoPage]
})
export class ArquivoPageModule {}
