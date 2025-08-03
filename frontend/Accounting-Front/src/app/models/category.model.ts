import { BaseModel } from './base.model';

export interface Category extends BaseModel {
  name: string;
}

export interface CategoryDto {
  id?: number;
  name: string;
}