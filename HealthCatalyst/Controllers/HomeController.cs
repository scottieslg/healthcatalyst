using HealthCatalyst.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HealthCatalyst.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			using (var ctx = new Context())
			{
				var user = new User()
				{
					Id = 1
				};

				ctx.Users.Add(user);
				ctx.SaveChanges();
			}
			return View();
		}
	}
}