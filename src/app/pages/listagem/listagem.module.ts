import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ListagemPage } from './listagem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListagemPage
      }, {
        path: ':ref',
        component: ListagemPage
      }
    ])
  ],
  declarations: [ListagemPage]
})
export class ListagemPageModule {}
