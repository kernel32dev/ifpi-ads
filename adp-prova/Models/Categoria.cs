using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace germano.Models;

public class Categoria
{
    [Display(Name="Código")]
    public int? Id { get; set; }
    public string? Nome { get; set; }
}
