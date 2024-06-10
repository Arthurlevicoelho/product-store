import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { ApiResponse } from './apiResponse';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {}

  getAll(page: any, pageSize:any) : Observable<ApiResponse> {
    return this.http.get<ApiResponse>('http://localhost:8080/products?page=0&size=1');
  }
  
}
