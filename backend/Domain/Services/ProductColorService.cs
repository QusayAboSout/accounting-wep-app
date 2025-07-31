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
    public class ProductColorServices : GeneralServices<ProductColor>, IProductColorServices
    {
        IRepository<ProductColor> _ProductColorRepository;
        IMapper _mapper;

        public ProductColorServices(IRepository<ProductColor> repository, IMapper mapper) : base(repository, mapper)
        {
            _ProductColorRepository = repository;
            _mapper = mapper;
        }
    }
}
