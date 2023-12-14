using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace germano_barbosa.Models;

public class NotaDeVenda {
    [Key]
    public int Id { get; set; }
    public DateTime Data { get; set; }
    public bool Tipo { get; set; }

    public ICollection<Item> Itens { get; set; }
    public int ClienteId { get; set; }
    [ForeignKey("ClienteId")]
    public Cliente Cliente { get; set; }
    public int VendedorId { get; set; }
    [ForeignKey("VendedorId")]
    public Vendedor Vendedor { get; set; }
    public int TransportadoraId { get; set; }
    [ForeignKey("TransportadoraId")]
    public Transportadora? Transportadora { get; set; }
    public ICollection<Pagamento> Pagamentos { get; set; }
    public int TipoDePagamentoId { get; set; }
    [ForeignKey("TipoDePagamentoId")]
    public TipoDePagamento TipoDePagamento { get; set; }

    public bool cancelar() {
        // TODO!
        return false;
    }
    public bool devolver() {
        // TODO!
        return false;
    }
}