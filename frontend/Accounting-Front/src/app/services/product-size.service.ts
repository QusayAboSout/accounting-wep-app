import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProductSizeDto } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductSizeService {
  private baseUrl = environment.apiUrl || 'https://localhost:9999/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProductSizeDto[]> {
    return this.http.get<ProductSizeDto[]>(`${this.baseUrl}/ProductSize/GetProductSizes`);
  }

  getById(id: number): Observable<ProductSizeDto> {
    return this.http.get<ProductSizeDto>(`${this.baseUrl}/ProductSize/GetProductSize/${id}`);
  }

  add(item: ProductSizeDto): Observable<ProductSizeDto> {
    return this.http.post<ProductSizeDto>(`${this.baseUrl}/ProductSize/AddProductSize`, item);
  }

  update(item: ProductSizeDto): Observable<ProductSizeDto> {
    return this.http.put<ProductSizeDto>(`${this.baseUrl}/ProductSize/UpdateProductSize`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/ProductSize/DeleteProductSize/${id}`);
  }
}