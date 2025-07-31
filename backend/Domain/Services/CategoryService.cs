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
    public class CategoryService : GeneralServices<Category>, ICategoryServices
    {
        IRepository<Category> _CategoryRepository;
        IMapper _mapper;

        public CategoryService(IRepository<Category> repository, IMapper mapper) : base(repository, mapper)
        {
            _CategoryRepository = repository;
            _mapper = mapper;
        }

    }
}
