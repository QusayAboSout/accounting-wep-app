import { BaseModel } from './base.model';
import { Category } from './category.model';
import { ProductColor } from './product-color.model';
import { ProductSize } from './product-size.model';

export interface Product extends BaseModel {
  name: string;
  cost: number;
  costPrice: number;
  barcode: string;
  categoryID: number;
  category?: Category;
  productColorID: number;
  productColor?: ProductColor;
  productSizeID: number;
  productSize?: ProductSize;
}

export interface ProductDto {
  id?: number;
  name: string;
  cost: number;
  costPrice: number;
  barcode: string;
  categoryID: number;
  colorID: number;
  sizeID: number;
}