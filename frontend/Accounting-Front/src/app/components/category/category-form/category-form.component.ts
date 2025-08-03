import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services';
import { CategoryDto } from '../../../models';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    CardModule, 
    InputTextModule, 
    ButtonModule, 
    MessageModule, 
    ProgressSpinnerModule,
    FloatLabelModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  loading = signal(false);
  error = signal<string | null>(null);
  isEditMode = signal(false);
  categoryId = signal<number | null>(null);

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.categoryId.set(+id);
      this.loadCategory(+id);
    }
  }

  loadCategory(id: number): void {
    this.loading.set(true);
    this.categoryService.getById(id).subscribe({
      next: (category) => {
        this.categoryForm.patchValue({
          name: category.name
        });
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('فشل في تحميل الفئة');
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: 'فشل في تحميل الفئة'
        });
        console.error('Error loading category:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.loading.set(true);
      this.error.set(null);

      const categoryDto: CategoryDto = {
        name: this.categoryForm.value.name
      };

      if (this.isEditMode()) {
        categoryDto.id = this.categoryId()!;
        this.categoryService.update(categoryDto).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'تم بنجاح',
              detail: 'تم تحديث الفئة بنجاح'
            });
            setTimeout(() => {
              this.router.navigate(['/categories']);
            }, 1000);
          },
          error: (err) => {
            this.error.set('فشل في تحديث الفئة');
            this.loading.set(false);
            this.messageService.add({
              severity: 'error',
              summary: 'خطأ',
              detail: 'فشل في تحديث الفئة'
            });
            console.error('Error updating category:', err);
          }
        });
      } else {
        this.categoryService.add(categoryDto).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'تم بنجاح',
              detail: 'تم إنشاء الفئة بنجاح'
            });
            setTimeout(() => {
              this.router.navigate(['/categories']);
            }, 1000);
          },
          error: (err) => {
            this.error.set('فشل في إنشاء الفئة');
            this.loading.set(false);
            this.messageService.add({
              severity: 'error',
              summary: 'خطأ',
              detail: 'فشل في إنشاء الفئة'
            });
            console.error('Error creating category:', err);
          }
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/categories']);
  }

  get nameControl() {
    return this.categoryForm.get('name');
  }
}