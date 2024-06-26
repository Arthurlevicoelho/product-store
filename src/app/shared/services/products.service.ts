import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { ApiResponse } from './apiResponse';
import { ProductPayload } from '../interfaces/payload-product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) { }

  getAll(page: number, size: number): Observable<ApiResponse> {
    const URL_GET_ALL = `${this.baseUrl}?page=${page}&size=${size}`;
    return this.http.get<ApiResponse>(URL_GET_ALL);
  }

  post(payload: FormData){
    return this.http.post(this.baseUrl ,payload);
  }

  put(payload: FormData){
    return this.http.put(this.baseUrl ,payload);
  }
  
}
