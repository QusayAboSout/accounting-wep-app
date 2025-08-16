import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule, DividerModule, TagModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  menuItems = [
    {
      title: 'الفئات',
      route: '/categories',
      icon: 'pi pi-folder',
      description: 'إدارة فئات المنتجات',
      category: 'إدارة البيانات',
      count: '12'
    },
    {
      title: 'ألوان المنتجات',
      route: '/product-colors',
      icon: 'pi pi-palette',
      description: 'إدارة ألوان المنتجات',
      category: 'خصائص المنتجات',
      count: '8'
    },
    {
      title: 'أحجام المنتجات',
      route: '/product-sizes',
      icon: 'pi pi-expand',
      description: 'إدارة أحجام المنتجات',
      category: 'خصائص المنتجات',
      count: '15'
    },
    {
      title: 'المنتجات',
      route: '/products',
      icon: 'pi pi-box',
      description: 'إدارة المنتجات',
      category: 'المنتجات الرئيسية',
      count: '45'
    },
    {
      title: 'المدفوعات',
      route: '/payments',
      icon: 'pi pi-dollar',
      description: 'إدارة المدفوعات',
      category: 'المدفوعات',
      count: '45'
    },
  ];

  // statistics = [
  //   {
  //     label: 'إجمالي المنتجات',
  //     value: '45',
  //     trend: '+12%',
  //     trendSeverity: 'success'
  //   },
  //   {
  //     label: 'الفئات النشطة',
  //     value: '12',
  //     trend: '+5%',
  //     trendSeverity: 'success'
  //   },
  //   {
  //     label: 'الألوان المتاحة',
  //     value: '8',
  //     trend: 'مستقر',
  //     trendSeverity: 'info'
  //   },
  //   {
  //     label: 'الأحجام المتاحة',
  //     value: '15',
  //     trend: '+3%',
  //     trendSeverity: 'success'
  //   }
  // ];

  // quickActions = [
  //   {
  //     label: 'إضافة منتج جديد',
  //     icon: 'pi pi-plus',
  //     route: '/products/new',
  //     severity: 'success' as const
  //   },
  //   {
  //     label: 'إضافة فئة جديدة',
  //     icon: 'pi pi-folder-plus',
  //     route: '/categories/new',
  //     severity: 'info' as const
  //   },
  //   {
  //     label: 'إضافة لون جديد',
  //     icon: 'pi pi-palette',
  //     route: '/product-colors/new',
  //     severity: 'warn' as const
  //   },
  //   {
  //     label: 'إضافة حجم جديد',
  //     icon: 'pi pi-expand',
  //     route: '/product-sizes/new',
  //     severity: 'help' as const
  //   }
  // ];
}