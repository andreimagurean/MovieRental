using MovieRentalBE.Models;
using MovieRentalBE.Sort;

namespace MovieRentalBE.Services;

public interface IMovieService
{
    Task<List<Movie>> GetMovies();
    Task<Movie> GetMovieById(Guid id, ReviewSort? sort);
    Task<Movie> CreateMovie(Movie movie);
    Task<Movie> UpdateMovie(Movie movie);
    Task DeleteMovie(Guid id);
}
