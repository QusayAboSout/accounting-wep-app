import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProductCategoryDto } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = environment.apiUrl || 'https://localhost:9999/api';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProductCategoryDto[]> {
    return this.http.get<ProductCategoryDto[]>(`${this.baseUrl}/Category/GetCategorys`);
  }

  getById(id: number): Observable<ProductCategoryDto> {
    return this.http.get<ProductCategoryDto>(`${this.baseUrl}/Category/GetCategory/${id}`);
  }

  add(item: ProductCategoryDto): Observable<ProductCategoryDto> {
    return this.http.post<ProductCategoryDto>(`${this.baseUrl}/Category/AddCategory`, item);
  }

  update(item: ProductCategoryDto): Observable<ProductCategoryDto> {
    return this.http.put<ProductCategoryDto>(`${this.baseUrl}/Category/UpdateCategory`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Category/DeleteCategory/${id}`);
  }
}
