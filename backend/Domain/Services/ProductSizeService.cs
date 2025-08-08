using AutoMapper;
using Domain.Interfaces;
using Domain.IServices;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public class ProductSizeServices : GeneralServices<ProductSize>, IProductSizeServices
    {
        IRepository<ProductSize> _ProductSizeRepository;
        IRepository<Product> _ProductRepository;
        IMapper _mapper;

        public ProductSizeServices(IRepository<ProductSize> repository, IMapper mapper, IRepository<Product> productRepository) : base(repository, mapper)
        {
            _ProductSizeRepository = repository;
            _mapper = mapper;
            _ProductRepository = productRepository;
        }

        public async Task<ActionResult> DeleteSize(long id)
        {
            var isUsed = await _ProductRepository.Get().AnyAsync(p => p.ProductSizeID == id);
            if (isUsed)
            {
                return new BadRequestObjectResult("يتم استخدام هذا الحجم من قبل بعض المنتجات ، لا يمكنك حذفه.");
            }
            var Size = await _ProductSizeRepository.Get().FirstOrDefaultAsync(c => c.ID == id);
            if (Size == null)
            {
                return new NotFoundObjectResult("الحجم غير موجود.");
            }
            await _ProductSizeRepository.Delete(Size);
            return new OkObjectResult("تم حذف الحجم بنجاح.");
        }
    }
}
