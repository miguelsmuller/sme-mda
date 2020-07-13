import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

declare let gtag:(type:string, eventName:string, eventAttr:any) => void;

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isLoading = false;

  constructor(
    public loadingController: LoadingController,
    private serviceToast: ToastController
  ) { }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create()
    .then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => {});
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => {});
  }

  async showToast(msg: string) {
    const toast = await this.serviceToast.create({
      message: msg,
      duration: 3500,
      position: 'middle',
    });
    toast.present();
  }

  newAnalyticsEvent(eventCategory: string,
    eventName: string,
    eventLabel: string = null,
    eventValue: string = null) {
    gtag('event', eventName, {
      event_category: eventCategory,
      event_label: eventLabel,
      value: eventValue });
  }

  newAnalyticsException(erroMessage: string) {
    gtag('send', 'exception', {
      exDescription: erroMessage,
      exFatal: false
    })
  }
}
