using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using PortoAPI.Models;

namespace PortoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContainerController : ControllerBase
    {
        private readonly PortoContext _context;

        public ContainerController(PortoContext context)
        {
            _context = context;
        }

        // GET: api/Container
        [HttpGet]
        public IEnumerable<Container> GetContainer()
        {
            return _context.Container;
        }

        // GET: api/Container/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetContainer([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var container = await _context.Container.FindAsync(id);

            if (container == null)
            {
                return NotFound();
            }

            return Ok(container);
        }

        // PUT: api/Container/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContainer([FromRoute] int id, [FromBody] Container container)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != container.ContainerId)
            {
                return BadRequest();
            }
            container.DtAtualizacao = DateTime.Now;

            _context.Entry(container).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContainerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(container);
        }

        // POST: api/Container
        [HttpPost]
        public async Task<IActionResult> PostContainer([FromBody] Container container)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            container.DtAtualizacao = DateTime.Now;
            container.DtCadastro = DateTime.Now;

            _context.Container.Add(container);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContainer", new { id = container.ContainerId }, container);
        }

        // DELETE: api/Container/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContainer([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var container = await _context.Container.FindAsync(id);
            if (container == null)
            {
                return NotFound();
            }

            _context.Container.Remove(container);
            await _context.SaveChangesAsync();

            return Ok(container);
        }

        private bool ContainerExists(int id)
        {
            return _context.Container.Any(e => e.ContainerId == id);
        }
    }
}