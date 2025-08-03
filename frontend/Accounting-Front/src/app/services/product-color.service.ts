import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProductColor, ProductColorDto } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductColorService {
  private baseUrl = environment.apiUrl || 'https://localhost:9999/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProductColorDto[]> {
    return this.http.get<ProductColorDto[]>(`${this.baseUrl}/ProductColor/GetProductColors`);
  }

  getById(id: number): Observable<ProductColorDto> {
    return this.http.get<ProductColorDto>(`${this.baseUrl}/ProductColor/GetProductColor/${id}`);
  }

  add(item: ProductColorDto): Observable<ProductColorDto> {
    return this.http.post<ProductColorDto>(`${this.baseUrl}/ProductColor/AddProductColor`, item);
  }

  update(item: ProductColorDto): Observable<ProductColorDto> {
    return this.http.put<ProductColorDto>(`${this.baseUrl}/ProductColor/UpdateProductColor`, item);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/ProductColor/DeleteProductColor/${id}`);
  }
}