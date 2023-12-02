using Microsoft.EntityFrameworkCore;
using germano.Models;

namespace germano.Models;

public class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

    public DbSet<Usuario>? Usuarios { get; set; }
    public DbSet<Carrinho>? Carrinhos { get; set; }
    public DbSet<Produto>? Produtos { get; set; }
    public DbSet<Item>? Itens { get; set; }
    public DbSet<Categoria>? Categorias { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        /*modelBuilder.Entity<Usuario>()
            .HasOne(e => e.Carrinho)
            .WithOne(e => e.Usuario)
            .HasForeignKey<Carrinho>("Carrinho");

        modelBuilder.Entity<Carrinho>()
            .HasOne(e => e.Usuario)
            .WithOne(e => e.Carrinho)
            .HasForeignKey<Usuario>("Usuario");*/

        /*modelBuilder.Entity<Carrinho>()
            .HasMany(e => e.Produtos)
            .WithOne(e => e.Carrinho)
            .HasForeignKey("Carrinho");*/
        /*modelBuilder.Entity<Produto>()
            .HasOne(e => e.Carrinho)
            .WithMany(e => e.Produtos)
            .HasForeignKey("Carrinho");*/

        /*modelBuilder.Entity<Categoria>()
            .HasMany(e => e.Produtos)
            .WithOne(e => e.Categoria)
            .HasForeignKey("Categoria");*/
    }
}
