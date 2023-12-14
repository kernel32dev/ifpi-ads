using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace germano_barbosa.Models;

public class Pagamento {
    [Key]
    public int Id { get; set; }
    public DateTime DataLimite { get; set; }
    public double Valor { get; set; }
    public bool Pago { get; set; }

    public int NotaDeVendaId { get; set; }
    [ForeignKey("NotaDeVendaId")]
    public NotaDeVenda NotaDeVenda { get; set; }
}