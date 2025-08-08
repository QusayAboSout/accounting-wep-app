import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { ProductSizeComponent } from './components/product-size/product-size.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductColorComponent } from './components/product-color/product-color.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },

  // Category routes
  { path: 'categories', component: CategoryListComponent },

  // Product Color routes
  { path: 'product-colors', component: ProductColorComponent },

  // Product Size routes
  { path: 'product-sizes', component: ProductSizeComponent },

  // Product routes
  { path: 'products', component: ProductListComponent },

  { path: '**', redirectTo: '/dashboard' }
];
