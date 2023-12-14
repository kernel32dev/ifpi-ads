using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace germano_barbosa.Models;

public class Item {
    [Key]
    public int Id { get; set; }
    public double Preco { get; set; }
    public int Percentual { get; set; }
    public int Quantidade { get; set; }

    public int ProdutoId { get; set; }
    [ForeignKey("ProdutoId")]
    public Produto Produto { get; set; }
    public int NotaDeVendaId { get; set; }
    [ForeignKey("NotaDeVendaId")]
    public NotaDeVenda NotaDeVenda { get; set; }
}