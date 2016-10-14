using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using HealthCatalyst.Models;

namespace HealthCatalyst
{
    public class Context : DbContext
    {
		public Context() : base("name=HealthCatalystDBConnectionString")
		{
		}

		public DbSet<User> Users { get; set; }
	}

}
