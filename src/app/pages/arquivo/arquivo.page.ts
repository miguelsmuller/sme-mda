import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DomSanitizer} from '@angular/platform-browser';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-arquivo',
  templateUrl: './arquivo.page.html',
})
export class ArquivoPage  implements OnInit {
  public itemUrl: any;
  private unSubscribeAllObservables$: Subject<any> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private serviceNavigation: NavController,
    private serviceSanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (data) => {
        this.itemUrl = this.serviceSanitizer.bypassSecurityTrustResourceUrl(data.item);
      }
    );
  }

  ngOnDestry() {
    this.unSubscribeAllObservables$.next();
  }

  goBack() {
    this.serviceNavigation.back();
  }
}
