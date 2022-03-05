using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Task__AspCore_React.Models
{
    public class DeveloperContext:DbContext
    {
        public DeveloperContext(DbContextOptions<DeveloperContext> options) : base(options)
        {

        }
        public DbSet<Developer> Developer { get; set; }
    }
}
