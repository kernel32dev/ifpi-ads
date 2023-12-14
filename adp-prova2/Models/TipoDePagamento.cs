using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace germano_barbosa.Models;

public class TipoDePagamento {
    [Key]
    public int Id { get; set; }
    public string NomeDoCobrado { get; set; }
    public string InformacoesAdicionais { get; set; }

    public ICollection<NotaDeVenda> NotasDeVenda { get; set; }
}