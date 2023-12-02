using System.ComponentModel.DataAnnotations;

namespace germano.Models;

public class Item
{
    [Display(Name="Código")]
    public int? Id { get; set; }
    [Display(Name="Código do Carrinho")]
    public string? CarrinhoId { get; set; }
    [Display(Name="Código do Produto")]
    public int? ProdutoId { get; set; }
    public int? Quantidade { get; set; }
}
