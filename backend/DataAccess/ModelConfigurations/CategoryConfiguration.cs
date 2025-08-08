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
    public class ProductCategoryConfiguration
    {
        public ProductCategoryConfiguration(EntityTypeBuilder<ProductCategory> entityTypeBuilder)
        {
            entityTypeBuilder.HasData(CreateData());
        }

        private List<ProductCategory> CreateData()
        {
            return new List<ProductCategory>()
            {
                 new ProductCategory { ID = 1, Name = "إلكترونيات" },
            new ProductCategory { ID = 2, Name = "ملابس" },
            new ProductCategory { ID = 3, Name = "طعام" }
            };
        }
    }
}
