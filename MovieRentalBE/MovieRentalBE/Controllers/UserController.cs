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
    public async Task<IActionResult> GetUser(string username) // TODO: Credentials should not be in the URL
    {
        User result = await userService.GetUser(username);
        if (result == null)
        {
            return BadRequest("Username or password is incorrect");
        }

        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(User user)
    {
        if (user.Username is null
            || user.Password is null)
        {
            return BadRequest("Username and password must be provided");
        }

        User existingUser = await userService.CheckUser(user.Username, user.Password);

        if (existingUser is null)
        {
            return BadRequest("Username or password is incorrect");
        }

        return Ok(existingUser);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(User user)
    {

        if (user.Username is null
            || user.Password is null)
        {
            return BadRequest("Username and password must be provided");
        }

        User existingUser = await userService.CheckUser(user.Username, user.Password);

        if (existingUser is not null)
        {
            return BadRequest("User already exists");
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
