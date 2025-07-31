using Domain.DTOs;
using Domain.IServices;
using Domain.Models;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        ICategoryServices _services;
        public CategoryController(ICategoryServices services)
        {
            _services = services;
        }

        [HttpGet("GetCategorys")]
        public async Task<List<CategoryDto>> GetCategorys()
        {
            return await _services.GetAll<CategoryDto>();
        }

        [HttpPost("AddCategory")]
        public async Task<CategoryDto> AddCategory([FromBody] CategoryDto value)
        {
            return await _services.Add(value);
        }
        [HttpPut("UpdateCategory")]
        public async Task<CategoryDto> UpdateCategory([FromBody] CategoryDto value)
        {
            return await _services.Update(value);
        }
        [HttpDelete("DeleteCategory/{id}")]
        public async Task<bool> DeleteCategory(long id)
        {
            return await _services.Delete(id);
        }
    }
}
