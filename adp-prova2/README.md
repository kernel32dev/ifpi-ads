
### Resposta da prova de análise e desenvolvimento de projetos
*ifpi-ads 2023.2 Germano Barbosa da Silva Júnior*

### Comandos (executar)
```sh
# atualiza os valores em appsettings.json e appsettings.Development.json para um servidor mysql que esteja rodando

# baixa as dependências do csproj
dotnet restore

# executa
dotnet run
```

### Comandos (desenvolvimento)
```sh
# nota: executando em uma máquina windows

# instala o dotnet com chocolatey (só funciona se tiver chocolatey instalado)
choco install dotnet-6.0-sdk -y

# instala a ferramenta cli do entity framework
dotnet tool install --global dotnet-ef --version "6.0.1"

# instala a ferramenta cli chamada dotnet-aspnet-codegenerator
dotnet tool install --global dotnet-aspnet-codegenerator --version "6.0.1"

# criar arquivos básicos
dotnet new mvc --no-https

# adicionado as models...
# criado a classe MyDbContext
# atualizado csproj com as dependências...

# baixa as dependências do csproj
dotnet restore

# gera os controllers e views
.\gerar_controllers.bat

# atualiza as views...

# faz a primeira migration
dotnet ef migrations add InitialCreate

# cria o banco e executa a primeira migration
dotnet ef database update

# finalmente, tudo certo e executa
dotnet run
```
