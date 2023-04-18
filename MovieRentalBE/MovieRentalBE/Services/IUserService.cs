using MovieRentalBE.Models;

namespace MovieRentalBE.Services;

public interface IUserService
{
    Task<List<User>> GetUsers();
    Task<User> GetUser(string username);
    Task<User> CheckUser(string username, string password);
    Task<User> UpdateUser(User user);
    Task<User> CreateUser(User user);
}
