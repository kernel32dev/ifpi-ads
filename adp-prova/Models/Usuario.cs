using System.ComponentModel.DataAnnotations;

namespace germano.Models;

public class Usuario
{
    [Display(Name="Código")]
    public int? Id { get; set; }
    public string? Login { get; set; }
    public string? Password { get; set; }
    public string? Email { get; set; }
}
