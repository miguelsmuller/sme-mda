import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { CommonService } from '@app/services/common.service';
import { environment } from '@env/environment';
import { User } from '@app/models/user.model';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage {
  public contactForm: FormGroup;
  public screenInSending = false;
  private activeUser: User;
  private apiEmailOptions = environment.apiEmail;

  constructor(
    private formConstructor: FormBuilder,
    private serviceNavigation: NavController,
    private serviceCommon: CommonService,
    private serviceRequest: HttpClient
  ) {
    this.activeUser = JSON.parse(localStorage.getItem('mda.user'));
    this.contactForm = this.formConstructor.group({
      tipo: ['', Validators.required],
      conteudo: ['', [
        Validators.required,
        Validators.minLength(10)]],
      telefone: ['', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(20)]]
    });
  }

  async sendForm() {
    this.screenInSending = true;
    if (this.contactForm.valid) {
      this.sendEmail(this.contactForm.value).subscribe(
        () => {
          this.screenInSending = false;
          this.contactForm.reset();
          this.serviceCommon.showToast('Manifestação enviada com sucesso!');
        }
      );
    } else {
      this.screenInSending = false;
      this.serviceCommon.showToast('Preencha o formulário corretamente!');
    }
  }

  goBack() {
    this.serviceNavigation.back();
  }

  sendEmail(data): Observable<any> {
    const httpUrl = `${this.apiEmailOptions.url}/messages`;

    let apiHeaders = new HttpHeaders();
    apiHeaders = apiHeaders.append('Authorization', 'Basic ' + btoa(this.apiEmailOptions.key));

    const bodyFromName = this.activeUser.name;
    const bodyFromEmail = this.activeUser.email;
    const bodyUnidade = this.activeUser.escola;
    const bodyMessageType = data.tipo;
    const bodyMessagePhone = data.telefone;
    const bodyMessageOriginal = data.conteudo;

    const bodyMessage = `<strong>Tipo de Manifestação</strong>: ${bodyMessageType} <br/> <strong>Solicitante</strong>: ${bodyFromName} <br/> <strong>Unidade Escolar</strong>: ${bodyUnidade} <br/> <strong>Telefone</strong>: ${bodyMessagePhone} <br/> <strong>Mensagem</strong>: ${bodyMessageOriginal}`.replace(/\r?\n/g, '<br/>');

    const httpData = new FormData();
    httpData.set('from', this.apiEmailOptions.emailFrom);
    httpData.set('to', 'sme.rc.pedagogico@gmail.com');
    httpData.set('subject', `${bodyMessageType} - ${bodyFromName} - ${bodyUnidade}` );
    httpData.set('h:Reply-To', `${bodyFromName} <${bodyFromEmail}>`);
    httpData.set('html', bodyMessage);

    return this.serviceRequest.post<any>(httpUrl, httpData, { headers: apiHeaders }).pipe(
      retry(1),
      catchError(error => {
        this.serviceCommon.showToast('Ação indisponível no momento!');
        return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
      })
    );
  }
}
