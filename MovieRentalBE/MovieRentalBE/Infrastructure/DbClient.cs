using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MovieRentalBE.Models;

namespace MovieRentalBE.Infrastructure;

public class DbClient : IDbClient
{
    private readonly IMongoCollection<Movie> movies;
    private readonly IMongoCollection<User> users;

    public DbClient(IOptions<MovieRentalDbConfig> options)
    {
        MongoClient client = new(options.Value.Connection_String);
        IMongoDatabase database = client.GetDatabase(options.Value.Database_Name);
        movies = database.GetCollection<Movie>(options.Value.Movies_Collection_Name);
        users = database.GetCollection<User>(options.Value.Users_Collection_Name);
    }

    public IMongoCollection<Movie> GetMoviesCollection()
    {
        return movies;
    }

    public IMongoCollection<User> GetUsersCollection()
    {
        return users;
    }
}
