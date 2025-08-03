import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, MenubarModule],
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('نظام المحاسبة');
  
  menuItems: MenuItem[] = [
    {
      label: 'الرئيسية',
      icon: 'pi pi-home',
      routerLink: '/dashboard'
    },
    {
      label: 'الفئات',
      icon: 'pi pi-folder',
      routerLink: '/categories'
    },
    {
      label: 'ألوان المنتجات',
      icon: 'pi pi-palette',
      routerLink: '/product-colors'
    },
    {
      label: 'أحجام المنتجات',
      icon: 'pi pi-expand',
      routerLink: '/product-sizes'
    },
    {
      label: 'المنتجات',
      icon: 'pi pi-box',
      routerLink: '/products'
    }
  ];
}
