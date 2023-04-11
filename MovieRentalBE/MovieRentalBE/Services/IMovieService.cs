using MovieRentalBE.Models;

namespace MovieRentalBE.Services;

public interface IMovieService
{
    List<Movie> GetMovies();
    Movie GetMovieById(Guid id);
    Movie CreateMovie(Movie movie);
    Movie UpdateMovie(Movie movie);
    void DeleteMovie(Guid id);
}
