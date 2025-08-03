import { BaseModel } from './base.model';

export interface ProductColor extends BaseModel {
  name: string;
}

export interface ProductColorDto {
  id?: number;
  name: string;
}