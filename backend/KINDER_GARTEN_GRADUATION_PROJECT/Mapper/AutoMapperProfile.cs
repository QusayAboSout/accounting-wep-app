using AutoMapper;
using Domain.Models;
using Domain.DTOs;
using WebApi.DTOs;
using System.Runtime.CompilerServices;
using Domain.DTOs.User;
using Org.BouncyCastle.Crypto.Agreement.JPake;

namespace WebApi.Mapper
{
    public static class AutoMapperProfile
    {
        public static IServiceCollection ConfigureMapper(this IServiceCollection services)
        {
            var config = new MapperConfiguration(cfg =>
            {

                cfg.CreateMap<Product, ProductDto>().ReverseMap();
                cfg.CreateMap<ProductCategory, ProductCategoryDto>().ReverseMap();
                cfg.CreateMap<ProductColor, ProductColorDto>().ReverseMap();
                cfg.CreateMap<ProductSize, ProductSizeDto>().ReverseMap();
                cfg.CreateMap<Payments, PaymentsDto>().ReverseMap();

            });
            var mapper = config.CreateMapper();
            services.AddSingleton(mapper);

            return services;
        }
    }
}
