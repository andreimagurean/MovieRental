using MovieRentalBE.Models;

namespace MovieRentalBE.Services;

public interface IMovieService
{
    Task<List<Movie>> GetMovies();
    Task<Movie> GetMovieById(Guid id);
    Task<Movie> CreateMovie(Movie movie);
    Task<Movie> UpdateMovie(Movie movie);
    Task DeleteMovie(Guid id);
}
