import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductColorService } from '../../services';
import { ProductColorDto } from '../../models';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-color-list',
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
    DialogModule,
    ReactiveFormsModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './product-color.component.html'
})
export class ProductColorComponent implements OnInit {
  productColors = signal<ProductColorDto[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  isEditMode = signal(false);
  visible: boolean = false;
  form!: FormGroup;
  selectedColor: ProductColorDto | null = null;

  constructor(
    private productColorService: ProductColorService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadProductColors();

    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  loadProductColors(): void {
    this.loading.set(true);
    this.error.set(null);

    this.productColorService.getAll().subscribe({
      next: (productColors) => {
        this.productColors.set(productColors);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('فشل في تحميل ألوان المنتجات');
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: 'فشل في تحميل ألوان المنتجات'
        });
        console.error('Error loading product colors:', err);
      }
    });
  }

  deleteProductColor(productColor: ProductColorDto): void {
    this.confirmationService.confirm({
      message: `هل أنت متأكد من حذف اللون "${productColor.name}"؟`,
      header: 'تأكيد الحذف',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'نعم',
      rejectLabel: 'لا',
      accept: () => {
        this.productColorService.delete(productColor.id!).subscribe({
          next: () => {
            this.loadProductColors();
            this.messageService.add({
              severity: 'success',
              summary: 'تم بنجاح',
              detail: 'تم حذف اللون بنجاح'
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'خطأ',
              detail: 'فشل في حذف اللون'
            });
            console.error('Error deleting product color:', err);
          }
        });
      }
    });
  }
  editProductColor(productColor: ProductColorDto): void {
    this.visible = true;
    this.isEditMode.set(true);
    this.selectedColor = productColor;
    this.form.patchValue({
      id: productColor.id,
      name: productColor.name
    });
  }

  addProductColor(): void {
    this.visible = true;
    this.isEditMode.set(false);
    this.selectedColor = null;
    this.form.reset();
  }

  get nameControl() {
    return this.form.get('name');
  }

  loadCategories(): void {
    this.loading.set(true);
    this.error.set(null);

    this.productColorService.getAll().subscribe({
      next: (colors) => {
        this.productColors.set(colors);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('فشل في تحميل الفئات');
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: 'فشل في تحميل الفئات'
        });
        console.error('Error loading categories:', err);
      }
    });
  }
  onSubmit() {
    if (this.form.invalid) return;

    const formValue = this.form.value;
    if (this.isEditMode()) {
      formValue.id = this.selectedColor?.id;
      this.productColorService.update(formValue).subscribe(() => {
        this.closeDialog();
        this.loadCategories();
      });
    } else {
      this.productColorService.add(formValue).subscribe(() => {
        this.closeDialog();
        this.loadCategories();
      });
    }
  }

  addColor(): void {
    this.visible = true;
    this.form.reset();
  }
  closeDialog(): void {
    this.visible = false;
    this.form.reset();
  }
}