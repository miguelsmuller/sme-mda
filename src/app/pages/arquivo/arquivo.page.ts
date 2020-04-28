import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NavController } from '@ionic/angular';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-arquivo',
  templateUrl: './arquivo.page.html',
  styleUrls: ['./arquivo.page.scss'],
})
export class ArquivoPage {
  urlFile: any;

  unSubscribeAllObservables$: Subject<any> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private ctrlNav: NavController,
    private sanitizer: DomSanitizer,
  ) {
    this.route.queryParams
    .pipe( takeUntil(this.unSubscribeAllObservables$) )
    .subscribe((params) => {
      const jsonParams = JSON.parse(params.value);
      // console.log(jsonParams.url);
      this.urlFile = this.sanitizer.bypassSecurityTrustResourceUrl(jsonParams.url);
    });
  }

  ngOnDestry() {
    this.unSubscribeAllObservables$.next();
  }

  goBack() {
    this.ctrlNav.back();
  }
}
