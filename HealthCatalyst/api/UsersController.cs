using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HealthCatalyst.Models;
using System.Threading.Tasks;

namespace HealthCatalyst.api
{
	[AllowAnonymous]
	public class UsersController : ApiController
    {
		[HttpGet]
		public async Task<List<User>> GetFilteredUsers([FromUri]string searchString, bool longWait)
		{
			if (longWait == true)
				System.Threading.Thread.Sleep(3000);

			// If the search string is empty, return an empty list
			if (string.IsNullOrWhiteSpace(searchString) == true)
				return new List<User>();

			var searchTerms = searchString.Split(' ').ToList();

			using (var ctx = new Context())
			{
				var usersQuery = ctx.Users.AsQueryable();

				foreach (var searchTerm in searchTerms)
				{
					usersQuery = usersQuery.Where(x =>
						x.Name.Contains(searchTerm)
					);
				}

				var users = await usersQuery.ToListAsync();

				return users;
			}
		}

		/// <summary>
		/// Adds a new user to the database
		/// </summary>
		/// <param name="userModel">The user information to add</param>
		/// <returns>A user model with the Id populated</returns>
		[HttpPost]
		public async Task<User> AddNewUser(User userModel)
		{
			if (userModel == null)
				return new User();

			using (var ctx = new Context())
			{
				ctx.Users.Add(userModel);

				await ctx.SaveChangesAsync();

				return userModel;
			}
		}
	}
}
