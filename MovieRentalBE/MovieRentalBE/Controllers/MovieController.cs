using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieRentalBE.Models;
using MovieRentalBE.Services;
using MovieRentalBE.Sort;

namespace MovieRentalBE.Controllers;

[ApiController]
[Route("[controller]")]
public class MovieController : ControllerBase
{
    private readonly IMovieService movieService;

    public MovieController(IMovieService movieService)
    {
        this.movieService = movieService;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetMovies()
    {
        return Ok(await movieService.GetMovies());
    }

    [Authorize]
    [HttpGet("{id}", Name = "GetMovie")]
    public async Task<IActionResult> GetMovie(Guid id, [FromQuery] ReviewSort sort)
    {
        return Ok(await movieService.GetMovieById(id, sort));
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateMovie(Movie movie)
    {
        if (movie.Stock < 0)
        {
            return BadRequest("Stock cannot be negative");
        }
        if (movie.Rating is < 1 or > 5)
        {
            return BadRequest("Rating invalid");
        }
        if (movie.Year is < 1888 or > 2050)
        {
            return BadRequest("Year invalid");
        }

        return Ok(await movieService.CreateMovie(movie));
    }

    [Authorize]
    [HttpPut]
    public async Task<IActionResult> UpdateMovie(Movie movie)
    {
        if (movie.Stock < 0)
        {
            return BadRequest("Stock cannot be negative");
        }
        if (movie.Rating is < 0 or > 5)
        {
            return BadRequest("Rating invalid");
        }
        if (movie.Year is < 1888 or > 2050)
        {
            return BadRequest("Year invalid");
        }

        return Ok(await movieService.UpdateMovie(movie));
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMovie(Guid id)
    {
        await movieService.DeleteMovie(id);
        return NoContent();
    }
}
