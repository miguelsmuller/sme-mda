import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemplateTabPage } from './template-tab.page';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TemplateTabPage,
    children: [
      {
        canActivate: [AuthGuard],
        path: 'inicio',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        canActivate: [AuthGuard],
        path: 'listagem',
        loadChildren: () => import('../listagem/listagem.module').then( m => m.ListagemPageModule)
      },
      {
        canActivate: [AuthGuard],
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        canActivate: [AuthGuard],
        path: 'arquivo',
        loadChildren: () => import('../arquivo/arquivo.module').then( m => m.ArquivoPageModule)
      },
      {
        path: 'sme',
        loadChildren: () => import('../sme/sme.module').then( m => m.SmePageModule)
      },
      {
        path: 'mda',
        loadChildren: () => import('../mda/mda.module').then( m => m.MdaPageModule)
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
export class TemplateTabPageRoutingModule {}
