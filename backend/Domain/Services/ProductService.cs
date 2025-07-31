using AutoMapper;
using Domain.DTOs;
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
    public class ProductService : GeneralServices<Product>, IProductServices
    {
        IRepository<Product> _ProductRepository;
        IMapper _mapper;

        public ProductService(IRepository<Product> repository, IMapper mapper) : base(repository, mapper)
        {
            _ProductRepository = repository;
            _mapper = mapper;
        }

    }
}
