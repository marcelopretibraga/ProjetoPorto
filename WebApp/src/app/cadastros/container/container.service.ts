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

  update(container: any) : Observable<any>{
    console.log(container)
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.put(environment.urlWebAPI + "Container/"+container.containerId,
     container).catch((error: any) => Observable.throw(error.error));
  }

  listAll() : Observable<any>{
    return this.http.get(environment.urlWebAPI + "Container/")
      .catch((error: any) => Observable.throw(error.error));
  }

  remove(id: number) : Observable<any>{
    return this.http.delete(environment.urlWebAPI + "Container/"+id)
      .catch((error: any) => Observable.throw(error.error));
  }

  getById(id: number) : Observable<any>{
    return this.http.get(environment.urlWebAPI + "Container/"+id)
      .catch((error: any) => Observable.throw(error.error));
  }


}
