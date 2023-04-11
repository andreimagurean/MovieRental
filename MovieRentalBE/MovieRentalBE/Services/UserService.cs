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

    public List<User> GetUsers()
    {
        return users.Find(m => true).ToList();
    }

    public User CreateUser(User user)
    {
        users.InsertOne(user);
        return user;
    }

    public User GetUserByUsername(string username)
    {
        return users.Find(user => user.Username == username).FirstOrDefault();
    }

    public User UpdateUser(User user)
    {
        users.ReplaceOne(b => b.Id == user.Id, user);
        return user;
    }

    public User ChecktUserCredentials(User user)
    {
        return users.Find(u => u.Username == user.Username && u.Password == user.Password).FirstOrDefault();
    }
}
