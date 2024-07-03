import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
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

  get(id: string) {
    return this.http.get<Product>(`http://localhost:8080/products/${id}`);
  }

  post(payload: FormData){
    return this.http.post(`${this.baseUrl}`, payload)
    .pipe(
      map((response: any) => response.messages[0]), // Captura a mensagem de sucesso
      catchError(this.handleError)
    );

  }

  put(id:string, payload: FormData){
    return this.http.put<Product>(`http://localhost:8080/products/${id}`,payload);
  }

  delete(id:string){
    return this.http.delete(`http://localhost:8080/products/${id}`).pipe(
      map((response: any) => response.messages[0]));
  }
  
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      // Erro no lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro no lado do servidor
      if (error.error && error.error.messages) {
        errorMessage = error.error.messages.join(', ');
      } else {
        errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
      }
    }
    return throwError(errorMessage);
  }
}
