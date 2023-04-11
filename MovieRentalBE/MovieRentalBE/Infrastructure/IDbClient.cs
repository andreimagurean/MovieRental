using MongoDB.Driver;
using MovieRentalBE.Models;

namespace MovieRentalBE.Infrastructure;

public interface IDbClient
{
    IMongoCollection<Movie> GetMoviesCollection();
    IMongoCollection<User> GetUsersCollection();
}
