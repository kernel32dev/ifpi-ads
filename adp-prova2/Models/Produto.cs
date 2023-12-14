using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace germano_barbosa.Models;

public class Produto {
    [Key]
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Descricao { get; set; }
    public string Quantidade { get; set; }
    public double Preco { get; set; }

    public ICollection<Item> Itens { get; set; }
    public int MarcaId { get; set; }
    [ForeignKey("MarcaId")]
    public Marca Marca { get; set; }
}