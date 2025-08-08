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
    public class ProductConfiguration
    {
        public ProductConfiguration(EntityTypeBuilder<Product> entityTypeBuilder)
        {
            entityTypeBuilder.HasOne(p => p.ProductCategory)
                   .WithMany()
                   .HasForeignKey(p => p.ProductCategoryID)
                   .OnDelete(DeleteBehavior.Restrict);

            entityTypeBuilder.HasOne(p => p.ProductColor)
                   .WithMany()
                   .HasForeignKey(p => p.ProductColorID)
                   .OnDelete(DeleteBehavior.Restrict);

            entityTypeBuilder.HasOne(p => p.ProductSize)
                   .WithMany()
                   .HasForeignKey(p => p.ProductSizeID)
                   .OnDelete(DeleteBehavior.Restrict);
            entityTypeBuilder.HasData(CreateData());
        }

        private List<Product> CreateData()
        {
            return new List<Product>()
            {
                new Product
            {
                ID = 1,
                Name = "Smartphone",
                Cost = 500,
                CostPrice = 450,
                ProductCategoryID = 1,
                ProductColorID = 1,
                ProductSizeID = 2,
                Barcode = "1234567890123",
            },
            new Product
            {
                ID = 2,
                Name = "T-Shirt",
                Cost = 30,
                CostPrice = 20,
                ProductCategoryID = 2,
                ProductColorID = 2,
                ProductSizeID = 1,
                Barcode = "8881112333888",

            },
            new Product
            {
                ID = 3,
                Name = "Chocolate Box",
                Cost = 15,
                CostPrice = 10,
                ProductCategoryID = 3,
                ProductColorID = 3,
                ProductSizeID = 3,
                Barcode = "3333333334443",

            }
            };
        }
    }
}
