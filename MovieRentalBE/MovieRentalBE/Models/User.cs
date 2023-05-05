using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace MovieRentalBE.Models;

public record User
{
    [BsonId]
    [BsonRequired]
    public Guid Id { get; set; }
    [Required]
    public string? Username { get; set; }
    public string? Password { get; set; }
    [EmailAddress]
    public string? Email { get; set; }
    public List<Guid>? MovieId { get; set; }
}