using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MovieRentalBE.Models;
using MovieRentalBE.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MovieRentalBE.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService userService;
    private readonly IConfiguration configuration;

    public UserController(IUserService userService, IConfiguration configuration)
    {
        this.userService = userService;
        this.configuration = configuration;
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        return Ok(await userService.GetUsers());
    }

    [Authorize]
    [HttpGet("username")]
    public async Task<IActionResult> GetUser()
    {
        if (HttpContext.User.Identity is ClaimsIdentity identity)
        {
            string? username = identity.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            return Ok(await userService.GetUser(username));
        }
        return NotFound();
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login(UserLogin user)
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

        string token = GenerateToken(existingUser);
        return Ok(token);
    }

    [AllowAnonymous]
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

    [Authorize]
    [HttpPut]
    public async Task<IActionResult> UpdateUser(User user)
    {
        return Ok(await userService.UpdateUser(user));
    }

    private string GenerateToken(User user)
    {
        SymmetricSecurityKey securityKey = new(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!));
        SigningCredentials credentials = new(securityKey, SecurityAlgorithms.HmacSha256);

        Claim[] claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Username!),
            new Claim(ClaimTypes.Email, user.Email!),
        };

        JwtSecurityToken token = new(configuration["Jwt:Issuer"],
            configuration["Jwt:Audience"],
            claims,
            expires: DateTime.Now.AddMinutes(15),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
