import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, retryWhen } from 'rxjs/operators';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
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
    return this.httpClient.get<Product[]>(this.apiUrl, { params })
      .pipe(
        retry(3)
      );
  }

  getProductsByPage(limit: number, offset: number) {
    return this.httpClient.get<Product[]>(`${this.apiUrl}`, {
      params: {limit, offset}
    });
  }

  getProduct(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`);
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
}
