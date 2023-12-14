using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace germano_barbosa.Models;

public class Vendedor {
    [Key]
    public int Id { get; set; }
    public int Nome { get; set; }

    public ICollection<NotaDeVenda> NotasDeVenda { get; set; }
}