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
    public class CategoryConfiguration
    {
        public CategoryConfiguration(EntityTypeBuilder<Category> entityTypeBuilder)
        {
            entityTypeBuilder.HasData(CreateData());
        }

        private List<Category> CreateData()
        {
            return new List<Category>()
            {
                 new Category { ID = 1, Name = "Electronics" },
            new Category { ID = 2, Name = "Clothing" },
            new Category { ID = 3, Name = "Food" }
            };
        }
    }
}
