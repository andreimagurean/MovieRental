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
    public async Task<IActionResult> GetUsers()
    {
        return Ok(await userService.GetUsers());
    }

    [HttpGet("username")]
    public async Task<IActionResult> GetUser(string username, string password)
    {
        User result = await userService.GetUser(username, password);
        if (result == null)
        {
            return BadRequest("Username or password is incorrect");
        }
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser(User user)
    {
        if (user.Username is not null
            && user.Password is not null
            && await userService.GetUser(user.Username, user.Password) is not null)
        {
            return BadRequest("Username already exists");
        }

        user.Id = Guid.NewGuid();
        return Ok(await userService.CreateUser(user));
    }

    [HttpPut]
    public async Task<IActionResult> UpdateUser(User user)
    {
        return Ok(await userService.UpdateUser(user));
    }
}
