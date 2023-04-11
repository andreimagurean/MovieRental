using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace MovieRentalBE.Models;

public class User
{
    [BsonId]
    [BsonRequired]
    public Guid Id { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
    [EmailAddress]
    public string? Email { get; set; }
}

