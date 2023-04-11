using MongoDB.Bson.Serialization.Attributes;

namespace MovieRentalBE.Models;

public record Movie
{
    [BsonId]
    [BsonRequired]
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Genre { get; set; }
    public int? Year { get; set; }
    public decimal? Rating { get; set; }
}
