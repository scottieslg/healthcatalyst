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
		/// <summary>
		/// Reads the database for users where the name contains any of the keywords entered.
		/// If longWait is true, it will pause for 3 seconds before returning the data
		/// </summary>
		/// <param name="searchString">A space separated list of strings to search for</param>
		/// <param name="longWait">If true, will wait 3 seconds before returning.  Else return as soon as the data is read.</param>
		/// <returns>A list of users, or an empty list if none are found.</returns>
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
				// Get a queryable object
				var usersQuery = ctx.Users.AsQueryable();

				// Iterate over each search term and add the contains to the tree
				foreach (var searchTerm in searchTerms)
				{
					usersQuery = usersQuery.Where(x =>
						x.Name.Contains(searchTerm)
					);
				}

				// Return the list of users filtered by the search terms
				var users = await usersQuery.ToListAsync();

				return users;
			}
		}

		/// <summary>
		/// Adds a new user to the database
		/// </summary>
		/// <param name="userModel">The user information to add</param>
		/// <returns>A user model with the id field populated</returns>
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
