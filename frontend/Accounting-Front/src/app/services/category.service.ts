import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category, CategoryDto } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = environment.apiUrl || 'https://localhost:9999/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${this.baseUrl}/Category/GetCategorys`);
  }

  getById(id: number): Observable<CategoryDto> {
    return this.http.get<CategoryDto>(`${this.baseUrl}/Category/GetCategory/${id}`);
  }

  add(item: CategoryDto): Observable<CategoryDto> {
    return this.http.post<CategoryDto>(`${this.baseUrl}/Category/AddCategory`, item);
  }

  update(item: CategoryDto): Observable<CategoryDto> {
    return this.http.put<CategoryDto>(`${this.baseUrl}/Category/UpdateCategory`, item);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/Category/DeleteCategory/${id}`);
  }
}
