import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: User;
  categorias = [{
    ref: '1ano',
    nome: '1º Ano'
  }, {
    ref: '2ano',
    nome: '2º Ano'
  }, {
    ref: '3ano',
    nome: '3º Ano'
  }, {
    ref: '4ano',
    nome: '4º Ano'
  }, {
    ref: '5ano',
    nome: '5º Ano'
  }, {
    ref: '6ano',
    nome: '6º Ano'
  }, {
    ref: '7ano',
    nome: '7º Ano'
  }, {
    ref: '8ano',
    nome: '8º Ano'
  }, {
    ref: '9ano',
    nome: '9º Ano'
  }, {
    ref: 'creche',
    nome: 'Creche'
  }, {
    ref: 'especial',
    nome: 'Educação Especial'
  }, {
    ref: 'pre',
    nome: 'Pré I e II'
  }];

  constructor(
    private ctrlNav: NavController
  ) {
    this.user = JSON.parse(localStorage.getItem('mda.user'));
  }

  ngOnInit() {

  }

  goToInicio() {
    this.ctrlNav.navigateRoot('inicio');
  }

  goToCategoria(ref: string) {
    this.ctrlNav.navigateForward(`/tabs/listagem/${ref}`);
  }

  goToSme() {
    this.ctrlNav.navigateForward(`/tabs/sme`);
  }

  goToMda() {
    this.ctrlNav.navigateForward(`/tabs/mda`);
  }
}
