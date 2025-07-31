using Domain.DTOs;
using Domain.IServices;
using Domain.Models;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        IProductServices _services;
        public ProductController(IProductServices services)
        {
            _services = services;
        }

        [HttpGet("GetProducts")]
        public async Task<List<ProductDto>> GetProducts()
        {
            return await _services.GetAll<ProductDto>();
        }

        [HttpPost("AddProduct")]
        public async Task<ProductDto> AddProduct([FromBody] ProductDto value)
        {
            return await _services.Add(value);
        }
        [HttpPut("UpdateProduct")]
        public async Task<ProductDto> UpdateProduct([FromBody] ProductDto value)
        {
            return await _services.Update(value);
        }
        [HttpDelete("DeleteProduct/{id}")]
        public async Task<bool> DeleteProduct(long id)
        {
            return await _services.Delete(id);
        }
    }
}
