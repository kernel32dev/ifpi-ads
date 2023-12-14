using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace germano_barbosa.Models;

public class PagamentoComCartao : TipoDePagamento {
    public int Banco { get; set; }
    public string NomeDoBanco { get; set; }
}