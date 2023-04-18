using Microsoft.AspNetCore.Mvc;
using MovieRentalBE.Models;
using MovieRentalBE.Services;

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

    [HttpGet]
    public async Task<IActionResult> GetMovies()
    {
        return Ok(await movieService.GetMovies());
    }

    [HttpGet("{id}", Name = "GetMovie")]
    public async Task<IActionResult> GetMovie(Guid id)
    {
        return Ok(await movieService.GetMovieById(id));
    }

    [HttpPost]
    public async Task<IActionResult> CreateMovie(Movie movie)
    {
        if (movie.Stock < 0)
        {
            return BadRequest("Stock cannot be negative");
        }

        return Ok(await movieService.CreateMovie(movie));
    }

    [HttpPut]
    public async Task<IActionResult> UpdateMovie(Movie movie)
    {
        if (movie.Stock < 0)
        {
            return BadRequest("Stock cannot be negative");
        }

        return Ok(await movieService.UpdateMovie(movie));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMovie(Guid id)
    {
        await movieService.DeleteMovie(id);
        return NoContent();
    }
}
