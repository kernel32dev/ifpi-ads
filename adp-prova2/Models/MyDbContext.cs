using Microsoft.EntityFrameworkCore;
using germano_barbosa.Models;

namespace germano_barbosa.Models;

public class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

    public DbSet<Cliente>? Cliente { get; set; }
    public DbSet<Item>? Item { get; set; }
    public DbSet<Marca>? Marca { get; set; }
    public DbSet<NotaDeVenda>? NotaDeVenda { get; set; }
    public DbSet<Pagamento>? Pagamento { get; set; }
    public DbSet<PagamentoComCartao>? PagamentoComCartao { get; set; }
    public DbSet<PagamentoComCheque>? PagamentoComCheque { get; set; }
    public DbSet<Produto>? Produto { get; set; }
    public DbSet<TipoDePagamento>? TipoDePagamento { get; set; }
    public DbSet<Transportadora>? Transportadora { get; set; }
    public DbSet<Vendedor>? Vendedor { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Produto>()
            .HasOne(p => p.Marca)
            .WithMany(m => m.Produtos)
            .HasForeignKey(p => p.MarcaId);
        modelBuilder.Entity<Item>()
            .HasOne(p => p.Produto)
            .WithMany(m => m.Itens)
            .IsRequired();
        modelBuilder.Entity<Item>()
            .HasOne(p => p.NotaDeVenda)
            .WithMany(m => m.Itens)
            .IsRequired();
        modelBuilder.Entity<NotaDeVenda>()
            .HasOne(p => p.Cliente)
            .WithMany(m => m.NotasDeVenda)
            .IsRequired();
        modelBuilder.Entity<NotaDeVenda>()
            .HasOne(p => p.Vendedor)
            .WithMany(m => m.NotasDeVenda)
            .IsRequired();
        modelBuilder.Entity<NotaDeVenda>()
            .HasOne(p => p.Transportadora)
            .WithMany(m => m.NotasDeVenda)
            .IsRequired();
        modelBuilder.Entity<NotaDeVenda>()
            .HasOne(p => p.TipoDePagamento)
            .WithMany(m => m.NotasDeVenda)
            .IsRequired();
        modelBuilder.Entity<Pagamento>()
            .HasOne(p => p.NotaDeVenda)
            .WithMany(m => m.Pagamentos)
            .IsRequired();
    }
}
