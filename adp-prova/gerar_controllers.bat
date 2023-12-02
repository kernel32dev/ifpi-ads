dotnet-aspnet-codegenerator controller -name UsuarioController -m Usuario -dc MyDbContext --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries
dotnet-aspnet-codegenerator controller -name CarrinhoController -m Carrinho -dc MyDbContext --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries
dotnet-aspnet-codegenerator controller -name ProdutoController -m Produto -dc MyDbContext --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries
dotnet-aspnet-codegenerator controller -name ItemController -m Item -dc MyDbContext --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries
dotnet-aspnet-codegenerator controller -name CategoriaController -m Categoria -dc MyDbContext --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries
pause
