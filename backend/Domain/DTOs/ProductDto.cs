using Domain.Models;
using WebApi.DTOs.Base;

namespace Domain.DTOs
{
    public class ProductDto : BaseDto
    {
        public string Name { get; set; }
        public long Cost { get; set; }
        public long CostPrice { get; set; }
        public string Barcode { get; set; }

        public long ProductCategoryID { get; set; }
        public long ProductSizeID { get; set; }
        public long ProductColorID { get; set; }

    }
}
