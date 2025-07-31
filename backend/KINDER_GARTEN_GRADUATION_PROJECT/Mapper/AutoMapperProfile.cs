using AutoMapper;
using Domain.Models;
using Domain.DTOs;
using WebApi.DTOs;
using System.Runtime.CompilerServices;
using Domain.DTOs.User;
using Domain.Models.UserVerificationCodeModel;

namespace WebApi.Mapper
{
    public static class AutoMapperProfile
    {
        public static IServiceCollection ConfigureMapper(this IServiceCollection services)
        {
            var config = new MapperConfiguration(cfg =>
            {

                cfg.CreateMap<Product, ProductDto>().ReverseMap();
                cfg.CreateMap<Category, CategoryDto>().ReverseMap();
                cfg.CreateMap<ProductColor, ProductColorDto>().ReverseMap();
                cfg.CreateMap<ProductSize, ProductSizeDto>().ReverseMap();

            });
            var mapper = config.CreateMapper();
            services.AddSingleton(mapper);

            return services;
        }
    }
}
