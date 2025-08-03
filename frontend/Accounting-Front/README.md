# نظام المحاسبة - الواجهة الأمامية

هذا تطبيق Angular 20 للواجهة الأمامية يتصل بـ ASP.NET Core Web API للخلفية لإدارة بيانات المحاسبة بما في ذلك الفئات والمنتجات وألوان المنتجات وأحجام المنتجات.

## المميزات

- **لوحة التحكم**: نظرة عامة على جميع الوحدات المتاحة
- **إدارة الفئات**: عمليات CRUD للفئات
- **إدارة ألوان المنتجات**: عمليات CRUD لألوان المنتجات
- **إدارة أحجام المنتجات**: عمليات CRUD لأحجام المنتجات
- **إدارة المنتجات**: عمليات CRUD للمنتجات مع العلاقات
- **تصميم متجاوب**: يعمل على أجهزة سطح المكتب والهواتف المحمولة
- **دعم RTL**: تخطيط من اليمين إلى اليسار للغة العربية
- **واجهة عربية**: جميع النصوص باللغة العربية
- **PrimeNG**: مكونات UI حديثة ومتقدمة

## التقنيات المستخدمة

- **Angular 20** مع Standalone Components و Signals
- **PrimeNG** لمكونات واجهة المستخدم
- **PrimeIcons** للأيقونات
- **TypeScript** للبرمجة المكتوبة
- **RxJS** للبرمجة التفاعلية
- **Angular Router** للتنقل
- **Angular Forms** (Reactive Forms) للنماذج

## هيكل المشروع

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/           # مكون لوحة التحكم الرئيسية
│   │   └── category/            # مكونات إدارة الفئات
│   │       ├── category-list/   # عرض جميع الفئات
│   │       └── category-form/   # نموذج إضافة/تعديل الفئة
│   ├── models/                  # واجهات TypeScript مطابقة لـ DTOs الخلفية
│   ├── services/                # خدمات HTTP للتواصل مع API
│   └── environments/            # إعدادات البيئة
└── styles.scss                 # الأنماط العامة مع دعم RTL
```

## المتطلبات المسبقة

- Node.js (الإصدار 18 أو أحدث)
- Angular CLI (الإصدار 20 أو أحدث)
- ASP.NET Core Web API يعمل على `https://localhost:9999`

## التثبيت

1. تثبيت التبعيات:
```bash
npm install
```

2. تحديث رابط API في `src/environments/environment.ts` إذا كانت الخلفية تعمل على منفذ مختلف:
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:9999/api'  // تحديث هذا الرابط
};
```

## تشغيل التطبيق

1. بدء خادم التطوير:
```bash
npm start
```

2. افتح المتصفح وانتقل إلى `http://localhost:4200`

3. تأكد من أن ASP.NET Core Web API يعمل على `https://localhost:9999`

## المسارات المتاحة

- `/dashboard` - لوحة التحكم الرئيسية مع التنقل لجميع الوحدات
- `/categories` - عرض جميع الفئات
- `/categories/add` - إضافة فئة جديدة
- `/categories/edit/:id` - تعديل فئة موجودة

## تكامل API

تتواصل الواجهة الأمامية مع الخلفية من خلال النقاط التالية:

### الفئات
- `GET /api/Category/GetCategorys` - الحصول على جميع الفئات
- `POST /api/Category/AddCategory` - إضافة فئة جديدة
- `PUT /api/Category/UpdateCategory` - تحديث فئة موجودة
- `DELETE /api/Category/DeleteCategory/{id}` - حذف فئة

### ألوان المنتجات
- `GET /api/ProductColor/GetProductColors` - الحصول على جميع ألوان المنتجات
- `POST /api/ProductColor/AddProductColor` - إضافة لون منتج جديد
- `PUT /api/ProductColor/UpdateProductColor` - تحديث لون منتج موجود
- `DELETE /api/ProductColor/DeleteProductColor/{id}` - حذف لون منتج

### أحجام المنتجات
- `GET /api/ProductSize/GetProductSizes` - الحصول على جميع أحجام المنتجات
- `POST /api/ProductSize/AddProductSize` - إضافة حجم منتج جديد
- `PUT /api/ProductSize/UpdateProductSize` - تحديث حجم منتج موجود
- `DELETE /api/ProductSize/DeleteProductSize/{id}` - حذف حجم منتج

### المنتجات
- `GET /api/Product/GetProducts` - الحصول على جميع المنتجات
- `POST /api/Product/AddProduct` - إضافة منتج جديد
- `PUT /api/Product/UpdateProduct` - تحديث منتج موجود
- `DELETE /api/Product/DeleteProduct/{id}` - حذف منتج

## البناء للإنتاج

```bash
npm run build
```

سيتم تخزين ملفات البناء في مجلد `dist/`.

## مميزات PrimeNG المستخدمة

- **MenuBar**: شريط التنقل الرئيسي
- **Card**: بطاقات لعرض المحتوى
- **Table**: جداول البيانات مع الترقيم
- **Button**: أزرار متنوعة
- **InputText**: حقول الإدخال
- **FloatLabel**: تسميات عائمة للحقول
- **Toast**: رسائل التنبيه
- **ConfirmDialog**: مربعات تأكيد الحذف
- **ProgressSpinner**: مؤشرات التحميل
- **Message**: رسائل الخطأ والنجاح
- **Toolbar**: شريط الأدوات

## دعم RTL والعربية

- تم تكوين التطبيق للعمل من اليمين إلى اليسار (RTL)
- جميع النصوص باللغة العربية
- تم تخصيص أنماط PrimeNG لدعم RTL
- الخطوط محسنة للنصوص العربية

## إعداد CORS

تأكد من أن ASP.NET Core للخلفية لديه CORS مكون للسماح بالطلبات من `http://localhost:4200`:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// في طريقة Configure
app.UseCors("AllowAngularApp");
```

## الخطوات التالية

لإكمال وظائف CRUD الكاملة لجميع الكيانات، ستحتاج إلى:

1. إنشاء مكونات لألوان المنتجات (مشابهة لمكونات الفئات)
2. إنشاء مكونات لأحجام المنتجات (مشابهة لمكونات الفئات)
3. إنشاء مكونات للمنتجات مع قوائم منسدلة للفئة واللون والحجم
4. إضافة المسارات المقابلة إلى `app.routes.ts`
5. تحديث روابط التنقل في لوحة التحكم

الهيكل قابل للتوسع ويتبع أفضل ممارسات Angular، مما يجعل من السهل التوسع بميزات إضافية.
