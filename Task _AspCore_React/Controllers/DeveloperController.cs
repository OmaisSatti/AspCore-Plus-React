using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Task__AspCore_React.Models;

namespace Task__AspCore_React.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DeveloperController : Controller
    {
        private DeveloperContext _DB;
        public DeveloperController(DeveloperContext Db)
        {
            _DB = Db;

        }
        [HttpGet("GetAllDeveloper")]
        public IEnumerable<Developer> GetAllDeveloper()
        {
            try
            {
                var lst = _DB.Developer.ToList();
                return lst.ToArray();
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.ToString();
                return null;
            }

        }
        [HttpGet("GetDeveloper/{id}")]
        public async Task<ActionResult<Developer>> GetDeveloper(int id)
        {
            var employee = await _DB.Developer.FindAsync(id);
            if (employee == null)
            {
                return NotFound();

            }
            return employee;
        }
        [HttpPut("UpdateDeveloper")]
        public async Task<ActionResult<Developer>> UpdateDeveloper(Developer prd)
        {
            _DB.Entry(prd).State = EntityState.Modified;
            try
            {
                await _DB.SaveChangesAsync();
                return prd;
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        [HttpPost("AddDeveloper")]
        public async Task<ActionResult<Developer>> AddDeveloper(List<Developer> prd)
        {
            if (prd != null)
            {
                foreach(var item in prd) 
                {
                    _DB.Developer.Add(item);
                    await _DB.SaveChangesAsync();
                }
                return RedirectToAction("GetDeveloper");
            }
            return RedirectToAction("GetDeveloper");
        }
        [HttpDelete("DeleteDeveloper/{id}")]
        public async Task<ActionResult<Developer>> DeleteDeveloper(int id)
        {
            var emp = await _DB.Developer.FindAsync(id);
            if (emp == null)
            {
                return NotFound();
            }
            _DB.Developer.Remove(emp);
            await _DB.SaveChangesAsync();
            return emp;
        }

    }
}
