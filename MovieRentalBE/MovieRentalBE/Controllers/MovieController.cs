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
    public IActionResult GetMovies()
    {
        return Ok(movieService.GetMovies());
    }

    [HttpGet("{id}", Name = "GetMovie")]
    public IActionResult GetMovie(Guid id)
    {
        return Ok(movieService.GetMovieById(id));
    }

    [HttpPost]
    public IActionResult CreateMovie(Movie movie)
    {
        return Ok(movieService.CreateMovie(movie));
    }

    [HttpPut]
    public IActionResult UpdateMovie(Movie movie)
    {
        return Ok(movieService.UpdateMovie(movie));
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteMovie(Guid id)
    {
        movieService.DeleteMovie(id);
        return NoContent();
    }
}
