using System.ComponentModel.DataAnnotations;

namespace germano_barbosa.Models;

public class Cliente {
    [Key]
    public int Id { get; set; }
    public int Nome { get; set; }

    public ICollection<NotaDeVenda> NotasDeVenda { get; set; }
}