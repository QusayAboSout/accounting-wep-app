using Domain.DTOs;
using Domain.IServices;
using Domain.Models;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductColorController : ControllerBase
    {
        IProductColorServices _services;
        public ProductColorController(IProductColorServices services)
        {
            _services = services;
        }

        [HttpGet("GetProductColors")]
        public async Task<List<ProductColorDto>> GetProductColors()
        {
            return await _services.GetAll<ProductColorDto>();
        }

        [HttpPost("AddProductColor")]
        public async Task<ProductColorDto> AddProductColor([FromBody] ProductColorDto value)
        {
            return await _services.Add(value);
        }
        [HttpPut("UpdateProductColor")]
        public async Task<ProductColorDto> UpdateProductColor([FromBody] ProductColorDto value)
        {
            return await _services.Update(value);
        }
        [HttpDelete("DeleteProductColor/{id}")]
        public async Task<bool> DeleteProductColor(long id)
        {
            return await _services.Delete(id);
        }
    }
}
