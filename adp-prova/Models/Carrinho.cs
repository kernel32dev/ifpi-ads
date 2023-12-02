using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace germano.Models;

public class Carrinho
{
    [Display(Name="Código")]
    public int? Id { get; set; }

    public int? UsuarioId { get; set; }
}
