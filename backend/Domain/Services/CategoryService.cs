using AutoMapper;
using Domain.DTOs;
using Domain.Interfaces;
using Domain.IServices;
using Domain.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public class ProductCategoryService : GeneralServices<ProductCategory>, ICategoryServices
    {
        IRepository<ProductCategory> _ProductCategoryRepository;
        IRepository<Product> _ProductRepository;
        IMapper _mapper;

        public ProductCategoryService(IRepository<ProductCategory> repository, IMapper mapper, IRepository<Product> productRepository) : base(repository, mapper)
        {
            _ProductCategoryRepository = repository;
            _mapper = mapper;
            _ProductRepository = productRepository;
        }

        public async Task<ActionResult> DeleteCategory(long id)
        {
            var isUsed = await _ProductRepository.Get().AnyAsync(p => p.ProductCategoryID == id);
            if (isUsed)
            {
                return new BadRequestObjectResult("يتم استخدام هذه الفئة من قبل بعض المنتجات ، لا يمكنك حذفها.");
            }
            var category = await _ProductCategoryRepository.Get().FirstOrDefaultAsync(c => c.ID == id);
            if (category == null)
            {
                return new NotFoundObjectResult("الفئة غير موجودة.");
            }
            await _ProductCategoryRepository.Delete(category);
            return new OkObjectResult("تم حذف الفئة بنجاح");
        }
    }
}
