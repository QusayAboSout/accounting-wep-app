import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductSizeService } from '../../../services';
import { ProductSizeDto } from '../../../models';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-product-size-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    TableModule, 
    ButtonModule, 
    CardModule, 
    ToolbarModule, 
    MessageModule, 
    ProgressSpinnerModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './product-size-list.component.html'
})
export class ProductSizeListComponent implements OnInit {
  productSizes = signal<ProductSizeDto[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(
    private productSizeService: ProductSizeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadProductSizes();
  }

  loadProductSizes(): void {
    this.loading.set(true);
    this.error.set(null);
    
    this.productSizeService.getAll().subscribe({
      next: (productSizes) => {
        this.productSizes.set(productSizes);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('فشل في تحميل أحجام المنتجات');
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: 'فشل في تحميل أحجام المنتجات'
        });
        console.error('Error loading product sizes:', err);
      }
    });
  }

  deleteProductSize(productSize: ProductSizeDto): void {
    this.confirmationService.confirm({
      message: `هل أنت متأكد من حذف الحجم "${productSize.name}"؟`,
      header: 'تأكيد الحذف',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'نعم',
      rejectLabel: 'لا',
      accept: () => {
        this.productSizeService.delete(productSize.id!).subscribe({
          next: () => {
            this.loadProductSizes();
            this.messageService.add({
              severity: 'success',
              summary: 'تم بنجاح',
              detail: 'تم حذف الحجم بنجاح'
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'خطأ',
              detail: 'فشل في حذف الحجم'
            });
            console.error('Error deleting product size:', err);
          }
        });
      }
    });
  }
}