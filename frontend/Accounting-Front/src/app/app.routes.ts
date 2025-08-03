import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryFormComponent } from './components/category/category-form/category-form.component';
import { ProductColorListComponent } from './components/product-color/product-color-list/product-color-list.component';
import { ProductSizeListComponent } from './components/product-size/product-size-list/product-size-list.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  
  // Category routes
  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/add', component: CategoryFormComponent },
  { path: 'categories/edit/:id', component: CategoryFormComponent },
  
  // Product Color routes
  { path: 'product-colors', component: ProductColorListComponent },
  
  // Product Size routes
  { path: 'product-sizes', component: ProductSizeListComponent },
  
  // Product routes
  { path: 'products', component: ProductListComponent },
  
  { path: '**', redirectTo: '/dashboard' }
];
