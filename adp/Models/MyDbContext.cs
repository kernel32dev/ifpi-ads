using Microsoft.EntityFrameworkCore;
using adp.Models;

namespace adp.Models;

public class MyDbContext: DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options): base(options) {}

    public DbSet<Usuario>? Usuario { get; set; }
    public DbSet<Pessoa>? Pessoa { get; set; }
    public DbSet<adp.Models.Professor> Professor { get; set; }
}
