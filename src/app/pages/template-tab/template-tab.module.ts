import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TemplateTabPageRoutingModule } from './template-tab-routing.module';

import { TemplateTabPage } from './template-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemplateTabPageRoutingModule
  ],
  declarations: [TemplateTabPage]
})
export class TemplateTabPageModule {}
