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

        public long CategoryID { get; set; }
        public long ColorID { get; set; }
        public long SizeID { get; set; }

    }
}
