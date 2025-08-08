import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductSizeService } from '../../services';
import { ProductSizeDto } from '../../models';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-product-size',
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
    ToastModule,
    ReactiveFormsModule,
    DialogModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './product-size.component.html'
})
export class ProductSizeComponent implements OnInit {
  productSizes = signal<ProductSizeDto[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  isEditMode = signal(false);
  selectedSize: ProductSizeDto | null = null;
  visible: boolean = false;
  form!: FormGroup;

  constructor(
    private productSizeService: ProductSizeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadProductSizes();

    this.form = this.fb.group({
      name: ['', Validators.required],
    });
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
  addProductSize(): void {
    this.visible = true;
    this.isEditMode.set(false);
    this.selectedSize = null;
    this.form.reset();
  }

  get nameControl() {
    return this.form.get('name');
  }

  editProductSize(size: ProductSizeDto): void {
    this.visible = true;
    this.isEditMode.set(true);
    this.selectedSize = size;
    this.form.patchValue({
      id: size.id,
      name: size.name
    });
  }

  closeDialog(): void {
    this.visible = false;
    this.form.reset();
  }

  onSubmit() {
    if (this.form.invalid) return;

    const formValue = this.form.value;
    if (this.isEditMode()) {
      formValue.id = this.selectedSize?.id;
      this.productSizeService.update(formValue).subscribe(() => {
        this.closeDialog();
        this.loadProductSizes();
      });
    } else {
      this.productSizeService.add(formValue).subscribe(() => {
        this.closeDialog();
        this.loadProductSizes();
      });
    }
  }
}