import { BaseModel } from './base.model';

export interface ProductSize extends BaseModel {
  name: string;
}

export interface ProductSizeDto {
  id?: number;
  name: string;
}