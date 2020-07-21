import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkeletonPage } from './skeleton.page';

import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedToHome = () => redirectLoggedInTo(['tabs/inicio']);

const routes: Routes = [
  {
    path: 'tabs',
    component: SkeletonPage,
    children: [
      {
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
        path: 'inicio',
        loadChildren: () => import('../pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
        path: 'listagem',
        loadChildren: () => import('../pages/listagem/listagem.module').then( m => m.ListagemPageModule)
      },
      {
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
        path: 'perfil',
        loadChildren: () => import('../pages/perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
        path: 'arquivo',
        loadChildren: () => import('../pages/arquivo/arquivo.module').then( m => m.ArquivoPageModule)
      },
      {
        path: 'apresentacao',
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
        loadChildren: () => import('../pages/sme/sme.module').then( m => m.SmePageModule)
      },
      {
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
        path: 'parque',
        loadChildren: () => import('../pages/parque/parque.module').then( m => m.ParquePageModule)
      },
      {
        path: 'perguntas-frequentes',
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
        loadChildren: () => import('../pages/faq/faq.module').then( m => m.FaqPageModule)
      },
      {
        path: 'contato',
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
        loadChildren: () => import('../pages/contato/contato.module').then( m => m.ContatoPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/inicio',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkeletonPageRoutingModule {}
