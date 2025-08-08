using Domain.Models.Base;

namespace Domain.Models
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }
        public long Cost { get; set; }
        public long CostPrice { get; set; }
        public string Barcode { get; set; }


        public long ProductCategoryID { get; set; }
        public ProductCategory ProductCategory { get; set; }
        public long ProductColorID { get; set; }
        public ProductColor ProductColor { get; set; }
        public long ProductSizeID { get; set; }
        public ProductSize ProductSize { get; set; }
    }
}
