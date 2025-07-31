using AutoMapper;
using Domain.Interfaces;
using Domain.IServices;
using Domain.Models;
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
        IMapper _mapper;

        public ProductSizeServices(IRepository<ProductSize> repository, IMapper mapper) : base(repository, mapper)
        {
            _ProductSizeRepository = repository;
            _mapper = mapper;
        }
    }
}
