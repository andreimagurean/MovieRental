using MongoDB.Driver;
using MovieRentalBE.Infrastructure;
using MovieRentalBE.Models;
using MovieRentalBE.Sort;

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
        movie.Rating = CalculateRating(movie);
        await movies.InsertOneAsync(movie);
        return movie;
    }

    public async Task<Movie> UpdateMovie(Movie movie)
    {
        movie.Rating = CalculateRating(movie);
        await movies.ReplaceOneAsync(b => b.Id == movie.Id, movie);
        return movie;
    }

    public async Task<Movie> GetMovieById(Guid id, ReviewSort? sort)
    {
        Movie movie = await movies.Find(movie => movie.Id == id).FirstOrDefaultAsync();

        if (movie.Reviews == null)
        {
            return movie;
        }

        movie.Reviews = sort switch
        {
            ReviewSort.User => movie.Reviews.OrderBy(x => x.Username).ToList(),
            ReviewSort.DateAscending => movie.Reviews.OrderBy(x => x.Datetime).ToList(),
            ReviewSort.DateDescending => movie.Reviews.OrderByDescending(x => x.Datetime).ToList(),
            ReviewSort.RatingAscending => movie.Reviews.OrderBy(x => x.Rating).ToList(),
            ReviewSort.RatingDescending => movie.Reviews.OrderByDescending(x => x.Rating).ToList(),
            _ => null,
        };

        return movie;
    }

    public List<Review>? GetReviews(Guid id, ReviewSort sort)
    {
        List<Review>? reviews = movies.Find(movie => movie.Id == id).FirstOrDefault().Reviews;

        if (reviews == null)
        {
            return null;
        }

        return sort switch
        {
            ReviewSort.User => reviews.OrderBy(x => x.Username).ToList(),
            ReviewSort.DateAscending => reviews.OrderBy(x => x.Datetime).ToList(),
            ReviewSort.DateDescending => reviews.OrderByDescending(x => x.Datetime).ToList(),
            ReviewSort.RatingAscending => reviews.OrderBy(x => x.Rating).ToList(),
            ReviewSort.RatingDescending => reviews.OrderByDescending(x => x.Rating).ToList(),
            _ => null,
        };
    }

    public async Task DeleteMovie(Guid id)
    {
        await movies.DeleteOneAsync(movie => movie.Id == id);
    }

    private static decimal? CalculateRating(Movie movie)
    {
        if (!movie.Reviews?.Any() ?? false)
        {
            return 0;
        }

        return movie.Reviews?.Sum(r => r.Rating) / movie.Reviews?.Count;
    }
}
