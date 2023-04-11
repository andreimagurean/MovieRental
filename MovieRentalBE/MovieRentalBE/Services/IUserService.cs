using MovieRentalBE.Models;

namespace MovieRentalBE.Services;

public interface IUserService
{
    List<User> GetUsers();
    User ChecktUserCredentials(User user);
    User UpdateUser(User user);
    User CreateUser(User user);
    User GetUserByUsername(string username);
}
