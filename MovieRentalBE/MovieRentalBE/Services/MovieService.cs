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

    public async Task<List<Movie>> GetMovies()
    {
        return await movies.Find(m => true).ToListAsync();
    }

    public async Task<Movie> CreateMovie(Movie movie)
    {
        movie.Id = Guid.NewGuid();
        await movies.InsertOneAsync(movie);
        return movie;
    }

    public async Task<Movie> UpdateMovie(Movie movie)
    {
        await movies.ReplaceOneAsync(b => b.Id == movie.Id, movie);
        return movie;
    }

    public async Task<Movie> GetMovieById(Guid id)
    {
        return await movies.Find(movie => movie.Id == id).FirstOrDefaultAsync();
    }

    public async Task DeleteMovie(Guid id)
    {
        await movies.DeleteOneAsync(movie => movie.Id == id);
    }
}
