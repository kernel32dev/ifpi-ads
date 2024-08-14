
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

MERGIR DEPOIS:
B2-cabo coaxial
    é um cabo bem diferente do cabo par trançado
    a semelhança é apenas na composição interna, pois ambos são de cobre
    foram utilizados no passado em redes locais
    no entanto hoje seu uso está praticamente restrito para antenas sejam de tv satélite ou internet
    é um cabo com uma estrutura que protege mais o cobre efeitos de interferencias externas
    === começo da imagem ===
    capa plástica externa
        malha de aço (blindagem)
            material plástico isolante
                fio de cobre
            material plástico isolante
        malha de aço (blindagem)
    capa plástica externa
    === fim da imagem ===
    podem ser classificados em
    coaxial fino
    coaxial grosso
B3-fibra óptica
    representa a maior evolução nos meios de transmissão
    a fibra é diferente de tudo que havia antes em termos de meio de transmissão
        fibra de vidro, não de cobre
        utiliza luz, não energia elétrica
    caracteristicas principais
        alta performance
        baixíssima taxa de erro
        excelente alcançe (autonomia)
    estrutúra básica
        fonte de luz
        fibra de vidro
        detector de luz
    classificação
        monomodo
        multimodo
CAMADA DE ENLACE
    é a primeira camada de nível inferior que possui estruturação de dados
    organiza os bits brutos vindos da camada física em estruturas de dados denominadas quadros (frames)
    serviços oferecidos
        sem conexão e sem confirmação
        sem conexão e com confirmação
        com conexão e com confirmação
    funções físicas da camada
        I: Enquadramento
            é a função da camada e necessária para o bom funcionamento das demais
            organiza os buts brutos vindos da camada física em quadros
                CABEÇALHO CARGA ÚTIL
                ^----- QUADRO -----^
            métodos de enquadramento
                contagem de caracteres
                    define um campo no cabeçalho para indicar o tamanho do quadro
                    ou seja, quantos bits ele possui
                    basta o receptor lêr esse campo e assim irá identificar onde o quadro encerra
                    51000140106101100210
                    ^-----^---^------^--
                    problema: erro em algum erro de contador -> quebra total de sincronismo
                byte de flag delimitador
                    consiste em definir um byte especial delimitador, chamado de flag
                    assim cada quadro começa e termina com o byte flag
                    um problema é a presença do byte flag na mensagem
                    a solução para isso é a inserção de outro caractere especial, aqui chamado de esc
                    ilustração:
                        (A)(B) -> (FLAG)(A)(B)(FLAG)
                        (A)(FLAG)(B) -> (FLAG)(A)(ESC)(FLAG)(B)(FLAG)
                        (A)(ESC)(B) -> (FLAG)(A)(ESC)(ESC)(B)(FLAG)
                        (A)(ESC)(FLAG)(B) -> (FLAG)(A)(ESC)(ESC)(ESC)(FLAG)(B)(FLAG)
        II: Controle de erros
            é outra função da camada de enlace
            essencial para identificar e/ou corrigir erros gerados pela rede
            dois métodos se destacam, sendo eles:
            Código de hamming
                um método de correção de erros
                ou seja detecta e corrige erros simples
                pode dar falso positivos e falso negativos
                como funciona o método
                    uma mensagem composta de bits a ser enviada é composta por 2 tipos de bits
                considere a sequência abaixo
                011001010110011011
                A) bits de código
                    também chamados de bits de verificação (paridade ou redundante)
                    no quadro ocupam as posições de potência de 2
                    011001010110011011
                    ^^ ^   ^       ^
                    esses bits são utilizados para verificar erros nos bits de dados
                    para isso, utiliza o conceito de bit de paridade, podendo ser par ou ímpar vejamos
                    10011010 (par)
                B) bits de dados
                    no quadro ocupam as posições diferentes da potência de 2
                    011001010110011011
                      ^ ^^^ ^^^^^^^ 
                como saber quais bits de dados entrarão no cálculo dos bits de paridade?
                o bit de paridade na posição N (base 1) é calculado a partir do xor dos bits de dados nos quais o Nº bit da posição é 1
                bit de paridade 1 = 3 + 5 + 7 + 9 + 11 + ...
                bit de paridade 2 = 3 + 6 + 7 + 10 + 11 + ...
                bit de paridade 4 = 5 + 6 + 7 + 12 + 13 + ...
                bit de paridade 8 = 9 + 10 + 11 + 12 + 13 + ...
            CRC (Código de redundância ciclíca)
                um método de detecção de erros
                ou seja, somente detecta erros no receptor, mas não faz correção
                nesse caso o quadro precisa ser retransmitido
                preciso, 100% de acerto
                crc se baseia na representação polinomial binária
                ou seja os coeficientes são 0s e 1s
                assim como hamming, utiiza a paridade, crc utiliza a operação XOR na aritmética do método

                dada uma sequência binária a ser transmitida, chamamos essa sequência de mcx
                assim como hamming define a paridade par ou ímpar, crc, defini o polinômo gerador g(x), que é um polinômo fornecido
                R é um número calculado como sendo o grau do g(x)

                o dado do transmissor
                I)   dado a sequência MCX, adicione R bits 0s a direita de MCX
                II)  divida essa sequência M(X) + [R bits 0s] pelo polinômio gerador
                III) o resto da divisão contendo R bits será o FCS (Frame Check Sequence)
                IV)  a sequência final transmitida será então MCX + FCS
        III: Controle de fluxo
        IV: Controle do acesso do meio


