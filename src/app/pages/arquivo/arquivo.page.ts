import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DomSanitizer} from '@angular/platform-browser';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-arquivo',
  templateUrl: './arquivo.page.html',
})
export class ArquivoPage {
  public itemUrl: any;
  private unSubscribeAllObservables$: Subject<any> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private serviceNavigation: NavController,
    private serviceSanitizer: DomSanitizer,
  ) {
    this.route.queryParams.subscribe(
      (data) => {
        this.itemUrl = this.serviceSanitizer.bypassSecurityTrustResourceUrl(data.item);

        // let url = data.item;
        // url = url.replace('&', '%26');
        // console.log(url);

        // const object = `https://docs.google.com/viewer?embedded=true&url=${url}`;
        // this.itemUrl = this.serviceSanitizer.bypassSecurityTrustResourceUrl(object);
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
