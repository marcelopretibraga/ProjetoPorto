import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Container } from './model/container';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContainerService extends BaseService{

  constructor(private http: HttpClient) {
    super();
  }

  save(container: any) : Observable<any>{
    console.log(container)
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.post(environment.urlWebAPI + "Container/", container)
      .catch((error: any) => Observable.throw(error.error));
  }

}
