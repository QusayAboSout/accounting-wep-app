using Domain.DTOs;
using Domain.IServices;
using Domain.Models;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductSizeController : ControllerBase
    {
        IProductSizeServices _services;
        public ProductSizeController(IProductSizeServices services)
        {
            _services = services;
        }

        [HttpGet("GetProductSizes")]
        public async Task<List<ProductSizeDto>> GetProductSizes()
        {
            return await _services.GetAll<ProductSizeDto>();
        }

        [HttpPost("AddProductSize")]
        public async Task<ProductSizeDto> AddProductSize([FromBody] ProductSizeDto value)
        {
            return await _services.Add(value);
        }
        [HttpPut("UpdateProductSize")]
        public async Task<ProductSizeDto> UpdateProductSize([FromBody] ProductSizeDto value)
        {
            return await _services.Update(value);
        }
        [HttpDelete("DeleteProductSize/{id}")]
        public async Task<IActionResult> DeleteProductSize(long id)
        {
            return await _services.DeleteSize(id);
        }
    }
}
