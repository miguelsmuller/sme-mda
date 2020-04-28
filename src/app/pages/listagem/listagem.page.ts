import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Arquivo } from 'src/app/models/arquivo.model';
import { FireBaseService } from 'src/app/services/firebase.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.page.html',
  styleUrls: ['./listagem.page.scss'],
})
export class ListagemPage implements OnInit {
  arquivos: Arquivo[];

  unSubscribeAllObservables$: Subject<any> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private fbService: FireBaseService,
    private ldService: LoadingService,
    private ctrlNav: NavController,
  ) { }

  ngOnInit() {
    this.route.params
      .pipe( takeUntil(this.unSubscribeAllObservables$) )
      .subscribe(params => {
        this.ldService.present();
        this.fbService.getArquivos(params.ref)
        .pipe( takeUntil(this.unSubscribeAllObservables$) )
        .subscribe(
          (data) => {
            this.arquivos = data;
            this.ldService.dismiss();
          }
        );
      }
    );
  }

  ngOnDestry() {
    this.unSubscribeAllObservables$.next();
  }

  goToArquivo(urlFile: string) {
    const object = { url: `https://docs.google.com/viewer?embedded=true&url=${urlFile}` };

    this.ctrlNav.navigateForward('/tabs/arquivo', {
      queryParams: {
        value : JSON.stringify(object)
      },
    });
  }

  goBack() {
    this.ctrlNav.back();
  }
}
