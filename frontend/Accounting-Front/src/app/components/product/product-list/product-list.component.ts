import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, CategoryService, ProductColorService, ProductSizeService } from '../../../services';
import { ProductDto, ProductCategoryDto, ProductColorDto, ProductSizeDto } from '../../../models';
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
  categories = signal<ProductCategoryDto[]>([]);
  productColors = signal<ProductColorDto[]>([]);
  productSizes = signal<ProductSizeDto[]>([]);

  categoryMap = new Map<number, string>();
  colorMap = new Map<number, string>();
  sizeMap = new Map<number, string>();

  dialogVisible = signal<boolean>(false);
  loading = signal(false);
  error = signal<string | null>(null);
  visible: boolean = false;
  form!: FormGroup;
  product: ProductDto = {} as ProductDto;
  isEditMode = signal(false);
  selectedProduct: ProductDto | null = null;

  loadingCategory = false;
  loadingColor = false;
  loadingSize = false;

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
    this.loadProducts();

    this.form = this.fb.group({
      name: ['', Validators.required],
      cost: [0, Validators.required],
      costPrice: [0, Validators.required],
      barcode: ['', Validators.required],
      productCategoryID: [null, Validators.required],
      productColorID: [null, Validators.required],
      productSizeID: [null, Validators.required]
    });

  }

  loadProducts(): void {
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

        this.categoryMap = new Map(
          data.categories
            .filter(c => c.id !== undefined && c.id !== null)
            .map(c => [c.id!, c.name])
        );
        this.colorMap = new Map(
          data.productColors
            .filter(c => c.id !== undefined && c.id !== null)
            .map(c => [c.id!, c.name])
        );
        this.sizeMap = new Map(
          data.productSizes
            .filter(s => s.id !== undefined && s.id !== null)
            .map(s => [s.id!, s.name])
        );
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

  getCategoryName(productCategoryID: number): string {
    const category = this.categories().find(c => c.id === productCategoryID);
    return category?.name || 'غير محدد';
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
            this.loadProducts();
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
  editProduct(product: ProductDto): void {
    this.visible = true;
    this.isEditMode.set(true);
    this.selectedProduct = product;
    this.form.patchValue({
      id: product.id,
      name: product.name,
      cost: product.cost,
      costPrice: product.costPrice,
      barcode: product.barcode,
      productCategoryID: product.productCategoryID,
      productColorID: product.productColorID,
      productSizeID: product.productSizeID
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
    if (this.form.invalid) return;
    const formValue = this.form.value;
    if (this.isEditMode()) {
      this.form.value.id = this.selectedProduct?.id;
      this.productService.update(formValue).subscribe(() => {
        this.closeDialog();
        this.loadProducts();
      });
    } else {
      this.productService.add(formValue).subscribe(() => {
        this.closeDialog();
        this.loadProducts();
      });
    }
  }
}