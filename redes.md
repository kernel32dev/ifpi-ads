
Dispositivo = Todo e qualquer erquipamento endereçavel e ativo na rede

Rede = conjunto de 2 ou mais dispositivos conectaods por um meio de transmissão e que utilizam protocolos para oferecer serviços aos usuários

Meio de transmiisao: e a infraestrutura utilizada para transportar os dados pela rede, pode ser com fio / set fio

Protocolo = é um conjunto de regras que definem como os dados são transmitidos e recebidos, bem como todos os aspectos necesários na comunicação entre todos os dispositivos envolvidos

na classificação de tipos de redes são usados os seguintes critérios
    meio de transmissão
        com fio: ethernet -> IEEE 802 3
        sem fio: wifi -> IEEE 802 11
    alcançe
        LAN (ethernet, wifi)
        MAN (tv a cabo, telefonia celular, wimax)
        WAN (internet, satélite)
    modo de transmissão
        redes por diffusão
            * canal de distribuição é único e compartilhado com todas as estações
            * um pacote enviado a uma estação é recebido por todas as outras
            * um campo de endereço identifica para qual estação está sendo transmitido
            * pode ser classificado em
            broadcasting (todas recebem)
            multicasting (o recebimento é particionado em canais)
        redes ponto a ponto
            a comunicação entre estações ocorre de maeinra direta, mas não necessariamente significa que estas estações estão se contectadas uma com a outra
            os dados trafegam pela rede ocupando apenas as estações intermediárias
            assim nem todas as estações da rede participam ou recebem os dados de uma determinada transmissão

modelos de arquitetura de redes
    toda e qualquer tecnologia de redes, é construida com base em um modelo ou projeto/arquitetura
    esse modelo especifica todo o funcionamento físico e lógico da tecnologia proposta, incluindo serviços e protocolos
    de modo geral esses modelos são construídos em camadas, mas saem popularmente conhecidos como modelos de camadas
    as camadas apresentam uma abstratção das funconalidades do modelo
    cada camada oferece/realiza um ou mais serviços para as camadas vizinhas
    a implementação nesses serviços é feita por protocolos
    e a comunicação entre eles é intermediada via interfaces
    em resumo:
        camada é a forma de dividir as funcionalidades do modelo
        serviço é a forma como a camada trabalha
        protocolo é a implementação dos serviços
    modelos de camadas:
    modelo osi/iso
    modelo tcp/ip
