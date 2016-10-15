using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HealthCatalyst.Models;

namespace HealthCatalyst.api
{
    public class UsersController : ApiController
    {
		/// <summary>
		/// Adds a new user to the database
		/// </summary>
		/// <param name="userModel">The user information to add</param>
		/// <returns>A user model with the Id populated</returns>
		[AllowAnonymous]
		[HttpPost]
		public User AddNewUser(User userModel)
		{
			if (userModel == null)
				return new User();

			using (var ctx = new Context())
			{
				ctx.Users.Add(userModel);

				ctx.SaveChanges();

				return userModel;
			}
		}
	}
}
