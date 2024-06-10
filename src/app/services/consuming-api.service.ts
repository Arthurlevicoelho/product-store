import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumingAPIService {

  constructor(private http: HttpClient) {}

  getDadosDaApi(page: any, pageSize:any) : Observable<any> {
    return this.http.get('http://localhost:8080/products?page=0&size=1');
  }
}
