import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, CategoryService, ProductColorService, ProductSizeService } from '../../../services';
import { ProductDto, CategoryDto, ProductColorDto, ProductSizeDto } from '../../../models';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { forkJoin } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-product-list',
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
    TagModule,
    DialogModule,
    ReactiveFormsModule,
    SelectModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products = signal<ProductDto[]>([]);
  categories = signal<CategoryDto[]>([]);
  productColors = signal<ProductColorDto[]>([]);
  productSizes = signal<ProductSizeDto[]>([]);
  dialogVisible = signal<boolean>(false);
  loading = signal(false);
  error = signal<string | null>(null);
  visible: boolean = false;
  form!: FormGroup;
  product: ProductDto = {} as ProductDto;

  loadingCategory = false;
  loadingColor = false;
  loadingSize = false;

  // categories: CategoryDto[] = [];
  // colors: ProductColorDto[] = [];
  // sizes: ProductSizeDto[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private productColorService: ProductColorService,
    private productSizeService: ProductSizeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadData();

    this.form = this.fb.group({
      name: ['', Validators.required],
      cost: [0, Validators.required],
      costPrice: [0, Validators.required],
      barcode: [''],
      categoryID: [null, Validators.required],
      productColorID: [null, Validators.required],
      productSizeID: [null, Validators.required]
    });

  }

  loadData(): void {
    this.loading.set(true);
    this.error.set(null);

    forkJoin({
      products: this.productService.getAll(),
      categories: this.categoryService.getAll(),
      productColors: this.productColorService.getAll(),
      productSizes: this.productSizeService.getAll()
    }).subscribe({
      next: (data) => {
        this.products.set(data.products);
        this.categories.set(data.categories);
        this.productColors.set(data.productColors);
        this.productSizes.set(data.productSizes);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('فشل في تحميل المنتجات');
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: 'فشل في تحميل المنتجات'
        });
        console.error('Error loading products:', err);
      }
    });
  }

  getCategoryName(categoryId: number): string {
    // const category = this.categories().find(c => c.id === categoryId);
    // return category?.name || 'غير محدد';
    return "غير محدد";
  }

  getColorName(colorId: number): string {
    const color = this.productColors().find(c => c.id === colorId);
    return color?.name || 'غير محدد';
  }

  getSizeName(sizeId: number): string {
    const size = this.productSizes().find(s => s.id === sizeId);
    return size?.name || 'غير محدد';
  }

  loadCategories() {
    if (this.categories.length === 0) {
      this.loadingCategory = true;
      this.categoryService.getAll().subscribe({
        next: (data) => {
          this.categories.set(data);
          this.loadingCategory = false;
        },
        error: () => this.loadingCategory = false
      });
    }
  }

  loadColors() {
    if (this.productSizes.length === 0) {
      this.loadingColor = true;
      this.productColorService.getAll().subscribe({
        next: (data) => {
          this.productColors.set(data);
          this.loadingColor = false;
        },
        error: () => this.loadingColor = false
      });
    }
  }

  loadSizes() {
    if (this.productSizes.length === 0) {
      this.loadingSize = true;
      this.productSizeService.getAll().subscribe({
        next: (data) => {
          this.productSizes.set(data);
          this.loadingSize = false;
        },
        error: () => this.loadingSize = false
      });
    }
  }
  openProductDialog(product?: ProductDto): void {
    const isEditMode = !!product;


    // this.ref = this.openProductDialog.open(ProductDialogComponent, {
    //   //header: isEditMode ? 'Edit Product' : 'Create New Product',
    //   width: '50vw',
    //   contentStyle: { "max-height": "500px", "overflow": "auto" },
    //   baseZIndex: 10000,
    //   // Pass data to the dialog component
    //   data: {
    //     product: product 
    //   }
    // });

  }

  deleteProduct(product: ProductDto): void {
    this.confirmationService.confirm({
      message: `هل أنت متأكد من حذف المنتج "${product.name}"؟`,
      header: 'تأكيد الحذف',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'نعم',
      rejectLabel: 'لا',
      accept: () => {
        this.productService.delete(product.id!).subscribe({
          next: () => {
            this.loadData();
            this.messageService.add({
              severity: 'success',
              summary: 'تم بنجاح',
              detail: 'تم حذف المنتج بنجاح'
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'خطأ',
              detail: 'فشل في حذف المنتج'
            });
            console.error('Error deleting product:', err);
          }
        });
      }
    });
  }
  showDialog(): void {
    this.visible = true;
    this.form.reset();
  }
  closeDialog(): void {
    this.visible = false;
    this.form.reset();
  }
  onSubmit() {
    if (this.form.valid) {
      const product: ProductDto = this.form.value;
      console.log('Submit product:', product);
      // Call API to save product
    } else {
      this.form.markAllAsTouched();
    }
  }
}