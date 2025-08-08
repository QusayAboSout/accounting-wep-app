import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProductDto } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.apiUrl || 'https://localhost:9999/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${this.baseUrl}/Product/GetProducts`);
  }

  getById(id: number): Observable<ProductDto> {
    return this.http.get<ProductDto>(`${this.baseUrl}/Product/GetProduct/${id}`);
  }

  add(item: ProductDto): Observable<ProductDto> {
    return this.http.post<ProductDto>(`${this.baseUrl}/Product/AddProduct`, item);
  }

  update(item: ProductDto): Observable<ProductDto> {
    return this.http.put<ProductDto>(`${this.baseUrl}/Product/UpdateProduct`, item);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/Product/DeleteProduct/${id}`);
  }
}