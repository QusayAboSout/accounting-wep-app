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
    public class ProductColorServices : GeneralServices<ProductColor>, IProductColorServices
    {
        IRepository<ProductColor> _ProductColorRepository;
        IRepository<Product> _ProductRepository;
        IMapper _mapper;

        public ProductColorServices(IRepository<ProductColor> repository, IMapper mapper, IRepository<Product> productRepository) : base(repository, mapper)
        {
            _ProductColorRepository = repository;
            _mapper = mapper;
            _ProductRepository = productRepository;
        }
        public async Task<ActionResult> DeleteColor(long id)
        {
            var isUsed = await _ProductRepository.Get().AnyAsync(p => p.ProductColorID == id);
            if (isUsed)
            {
                return new BadRequestObjectResult("يتم استخدام هذا اللون من قبل بعض المنتجات ، لا يمكنك حذفه.");
            }
            var Color = await _ProductColorRepository.Get().FirstOrDefaultAsync(c => c.ID == id);
            if (Color == null)
            {
                return new NotFoundObjectResult("اللون غير موجود.");
            }
            await _ProductColorRepository.Delete(Color);
            return new OkObjectResult("تم حذف اللون بنجاح.");
        }
    }
}
