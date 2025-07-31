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
    public class ProductSizeConfiguration
    {
        public ProductSizeConfiguration(EntityTypeBuilder<ProductSize> entityTypeBuilder)
        {
            entityTypeBuilder.HasData(CreateData());
        }

        private List<ProductSize> CreateData()
        {
            return new List<ProductSize>()
            {
               new ProductSize { ID = 1, Name = "Small" },
            new ProductSize { ID = 2, Name = "Medium" },
            new ProductSize { ID = 3, Name = "Large" }
            };
        }
    }
}
