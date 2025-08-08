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
        public async Task<List<ProductCategoryDto>> GetCategorys()
        {
            return await _services.GetAll<ProductCategoryDto>();
        }

        [HttpPost("AddCategory")]
        public async Task<ProductCategoryDto> AddCategory([FromBody] ProductCategoryDto value)
        {
            return await _services.Add(value);
        }
        [HttpPut("UpdateCategory")]
        public async Task<ProductCategoryDto> UpdateCategory([FromBody] ProductCategoryDto value)
        {
            return await _services.Update(value);
        }
        [HttpDelete("DeleteCategory/{id}")]
        public async Task<IActionResult> DeleteCategory(long id)
        {
            return await _services.DeleteCategory(id);
        }
    }
}
