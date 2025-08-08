import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../../services';
import { ProductCategoryDto } from '../../../models';
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
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { FloatLabelModule } from 'primeng/floatlabel';
@Component({
  selector: 'app-category-list',
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
    TagModule,
    FloatLabelModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {
  categories = signal<ProductCategoryDto[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  isEditMode = signal(false);
  selectedCategory: ProductCategoryDto | null = null;
  visible: boolean = false;
  form!: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadCategories();

    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  loadCategories(): void {
    this.loading.set(true);
    this.error.set(null);

    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories.set(categories);
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

  deleteCategory(category: ProductCategoryDto): void {
    this.confirmationService.confirm({
      message: `هل أنت متأكد من حذف الفئة "${category.name}"؟`,
      header: 'تأكيد الحذف',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'نعم',
      rejectLabel: 'لا',
      accept: () => {
        this.categoryService.delete(category.id!).subscribe({
          next: () => {
            this.loadCategories();
            this.messageService.add({
              severity: 'success',
              summary: 'تم بنجاح',
              detail: 'تم حذف الفئة بنجاح'
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'خطأ',
              detail: err.error || 'فشل في حذف الفئة'
            });
          }
        });
      }
    });
  }

  get nameControl() {
    return this.form.get('name');
  }

  editCategory(category: ProductCategoryDto): void {
    this.visible = true;
    this.isEditMode.set(true);
    this.selectedCategory = category;
    this.form.patchValue({
      id: category.id,
      name: category.name
    });
  }

  closeDialog(): void {
    this.visible = false;
    this.form.reset();
  }

  addCategory(): void {
    this.visible = true;
    this.isEditMode.set(false);
    this.selectedCategory = null;
    this.form.reset();
  }

  onSubmit() {
    if (this.form.invalid) return;

    const formValue = this.form.value;
    if (this.isEditMode()) {
      formValue.id = this.selectedCategory?.id;
      this.categoryService.update(formValue).subscribe(() => {
        this.closeDialog();
        this.loadCategories();
      });
    } else {
      this.categoryService.add(formValue).subscribe(() => {
        this.closeDialog();
        this.loadCategories();
      });
    }
  }

}