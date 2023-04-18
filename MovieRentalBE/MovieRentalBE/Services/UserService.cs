using MongoDB.Driver;
using MovieRentalBE.Infrastructure;
using MovieRentalBE.Models;

namespace MovieRentalBE.Services;

public class UserService : IUserService
{
    private readonly IMongoCollection<User> users;
    public UserService(IDbClient dbClient)
    {
        users = dbClient.GetUsersCollection();
    }

    public async Task<List<User>> GetUsers()
    {
        return await users.Find(m => true).ToListAsync();
    }

    public async Task<User> CreateUser(User user)
    {
        await users.InsertOneAsync(user);
        return user;
    }

    public async Task<User> UpdateUser(User user)
    {
        await users.ReplaceOneAsync(u => u.Id == user.Id, user);
        return user;
    }

    public async Task<User> CheckUser(string? username, string? password)
    {
        return await users.Find(u => u.Username == username && u.Password == password).FirstOrDefaultAsync();
    }

    public async Task<User> GetUser(string? username)
    {
        return await users.Find(u => u.Username == username).FirstOrDefaultAsync();
    }
}
