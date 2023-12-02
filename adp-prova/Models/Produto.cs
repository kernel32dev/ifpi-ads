using System.ComponentModel.DataAnnotations;

namespace germano.Models;

public class Produto
{
    [Display(Name="Código")]
    public int? Id { get; set; }
    public string? Descricao { get; set; }
    [Display(Name="Imagem")]
    public string? PathImagem { get; set; }
    [Display(Name="Preço")]
    public Decimal? Perco { get; set; }
    public int? CarrinhoId { get; set; }
}
