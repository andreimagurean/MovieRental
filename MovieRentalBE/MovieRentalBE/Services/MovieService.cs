using MongoDB.Driver;
using MovieRentalBE.Infrastructure;
using MovieRentalBE.Models;

namespace MovieRentalBE.Services;

public class MovieService : IMovieService
{
    private readonly IMongoCollection<Movie> movies;
    public MovieService(IDbClient dbClient)
    {
        movies = dbClient.GetMoviesCollection();
    }

    public List<Movie> GetMovies()
    {
        return movies.Find(m => true).ToList();
    }

    public Movie CreateMovie(Movie movie)
    {
        movie.Id = Guid.NewGuid();
        movies.InsertOne(movie);
        return movie;
    }

    public Movie UpdateMovie(Movie movie)
    {
        movies.ReplaceOne(b => b.Id == movie.Id, movie);
        return movie;
    }

    public Movie GetMovieById(Guid id)
    {
        return movies.Find(movie => movie.Id == id).FirstOrDefault();
    }

    public void DeleteMovie(Guid id)
    {
        movies.DeleteOne(movie => movie.Id == id);
    }

}
