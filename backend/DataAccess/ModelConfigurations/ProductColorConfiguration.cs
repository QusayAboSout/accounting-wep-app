using DataAccess.Constants;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.ModelConfigurations
{
    public class ProductColorConfiguration
    {
        public ProductColorConfiguration(EntityTypeBuilder<ProductColor> entityTypeBuilder)
        {
            entityTypeBuilder.HasData(CreateData());
        }

        private List<ProductColor> CreateData()
        {
            return new List<ProductColor>()
            {
               new ProductColor { ID = 1, Name = "أحمر" },
            new ProductColor { ID = 2, Name = "أزرق" },
            new ProductColor { ID = 3, Name = "أخضر" }
            };
        }
    }
}
