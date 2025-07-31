using Microsoft.EntityFrameworkCore;
using Domain.Models;

using DataAccess.ModelConfigurations;
using Domain.DTOs;
namespace DataAccess.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }


        public DbSet<Product> Products { get; set; } = null!;
        public DbSet<ProductColor> ProductColors { get; set; } = null!;
        public DbSet<ProductSize> ProductSizes { get; set; } = null!;
        public DbSet<Category> Categories { get; set; } = null!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            new ProductConfiguration(modelBuilder.Entity<Product>());
            new ProductColorConfiguration(modelBuilder.Entity<ProductColor>());
            new ProductSizeConfiguration(modelBuilder.Entity<ProductSize>());
            new CategoryConfiguration(modelBuilder.Entity<Category>());


            base.OnModelCreating(modelBuilder);
        }
    }
}

