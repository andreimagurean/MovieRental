using Microsoft.AspNetCore.Mvc;
using MovieRentalBE.Models;
using MovieRentalBE.Services;

namespace MovieRentalBE.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService userService;

    public UserController(IUserService userService)
    {
        this.userService = userService;
    }

    [HttpGet]
    public IActionResult GetUsers()
    {
        return Ok(userService.GetUsers());
    }

    [HttpGet("{username}")]
    public IActionResult GetUserByUsername(string username)
    {
        return Ok(userService.GetUserByUsername(username));
    }

    [HttpPost]
    public IActionResult CreateUser(User user)
    {
        if (user.Email is not null && user.Username is not null)
        {
            if (userService.GetUserByUsername(user.Username) is not null)
            {
                return BadRequest("Username already exists");
            }

            user.Id = Guid.NewGuid();
            return Ok(userService.CreateUser(user));
        }
        else
        {
            User checkValidUser = userService.ChecktUserCredentials(user);
            if (checkValidUser == null)
            {
                return BadRequest("Username or password is invalid");
            }
            return Ok(checkValidUser);
        }
    }

    [HttpPut]
    public IActionResult UpdateUser(User user)
    {
        return Ok(userService.UpdateUser(user));
    }
}
