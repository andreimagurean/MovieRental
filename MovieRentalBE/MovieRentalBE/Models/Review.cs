namespace MovieRentalBE.Models;

public record Review
{
    public string? Username { get; set; }
    public string? Description { get; set; }
    public DateTime? Datetime { get; set; }
}
