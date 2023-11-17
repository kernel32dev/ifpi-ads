using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace adp.Migrations
{
    public partial class CreateTableProfessor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Pessoa",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "Formacao",
                table: "Pessoa",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Salario",
                table: "Pessoa",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Pessoa");

            migrationBuilder.DropColumn(
                name: "Formacao",
                table: "Pessoa");

            migrationBuilder.DropColumn(
                name: "Salario",
                table: "Pessoa");
        }
    }
}
