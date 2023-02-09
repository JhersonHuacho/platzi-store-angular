import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { retry, retryWhen, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { checkTime } from './../interceptors/time.interceptor'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // private readonly apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';
  private readonly apiUrl = `${environment.API_URL}/api/products`;

  constructor(private httpClient: HttpClient) { }

  getAllProducts(limit?: number, offset?: number): Observable<Product[]> {
    //return this.httpClient.get<Product[]>('https://fakestoreapi.com/products');
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.httpClient.get<Product[]>(this.apiUrl, { params, context: checkTime() })
      .pipe(
        retry(3),
        map(products => products.map(item => {
          return {
            ...item,
            taxes: .19 * item.price
          }
        }))
      );
  }

  getProductsByPage(limit: number, offset: number) {
    return this.httpClient.get<Product[]>(`${this.apiUrl}`, {
      params: {limit, offset}
    });
  }

  getProduct(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Conflict) {
            return throwError('Algo esta fallando en el server');
          }
          if (error.status === HttpStatusCode.NotFound) {
            return throwError('El producto no existe');
          }
          if (error.status === HttpStatusCode.Unauthorized) {
            return throwError('No estas autorizado');
          }
          return throwError('Ups algo salio mal');
        })
      );
  }

  create(dataDto: CreateProductDTO) {
    return this.httpClient.post<Product>(this.apiUrl, dataDto);
  }

  update(id: string, dataDto: UpdateProductDTO) {
    return this.httpClient.put<Product>(`${this.apiUrl}/${id}`, dataDto);
  }

  delete(id: string) {
    return this.httpClient.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  fetchReadAndUpdate(id: string, dataDto: UpdateProductDTO) {
    return zip(
      this.getProduct(id),
      this.update(id, dataDto)
    );
  }
}
