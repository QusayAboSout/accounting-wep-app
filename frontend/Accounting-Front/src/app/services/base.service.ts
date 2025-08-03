import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T, TDto> {
  protected abstract endpoint: string;
  protected baseUrl = environment.apiUrl || 'https://localhost:9999/api';

  constructor(protected http: HttpClient) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${this.endpoint}/Get${this.endpoint}s`);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${this.endpoint}/Get${this.endpoint}/${id}`);
  }

  add(item: TDto): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${this.endpoint}/Add${this.endpoint}`, item);
  }

  update(item: TDto): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${this.endpoint}/Update${this.endpoint}`, item);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${this.endpoint}/Delete${this.endpoint}/${id}`);
  }
}