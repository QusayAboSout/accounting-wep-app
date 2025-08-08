using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi.DTOs.Base;

namespace Domain.DTOs
{
    public class ProductCategoryDto : BaseDto
    {
        public string Name { get; set; }
    }
}
