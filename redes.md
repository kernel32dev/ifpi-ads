
Dispositivo = Todo e qualquer erquipamento endereçavel e ativo na rede

Rede = conjunto de 2 ou mais dispositivos conectados por um meio de transmissão e que utilizam protocolos para oferecer serviços aos usuários

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
    tipo de serviço
        serviço é aquilo que a camada faz e/ou oferece as camadas adjascentes
        nesse contexto existem 2 tipos de serviços, sendo eles SOC e SNOC (serviço (não) orientado a conexão)
            SOC - serviço orientado a conexão
                esse serviço exige que seja estabelescida uma conexão entre transmissão e receptor antes do início da transmissão de dados
                nesse processo de conexão são negociados e definidos algumas regras ou parâmetros
                    rota (caminho percorrido pelos pacores na rede)
                    tamanho máximo do pacote
                    tipo de confimaçãoo de entrega (confiabilidade)
                    outros
                dessa forma são seguidas as seguintes etapas
                    I  ) solicitação da conexão
                    II ) estabelecimento da conexão
                    III) transmissão de dados
                    IV ) solicitação de encerramento da conexão
                    V  ) encerramento da conectados
            SNOC - serviço não orientado a conexão
                nesse serviço não há obrigatoriedadde de estabelescimento de conexão previa
                cada pacote é enviado na rede ao destino sem conhecimento da rota
                cada pacote é roteado independentemente do outro
                a ordem de chegada não é garantida
                podem ser confirmados ou não confirmados
                é um serviço menos confiável, porém mais rápido que SOC
    modelos de camadas:
        modelo osi/iso
            modelo proposto pela iso (international standard organization)
            é considerado um modelo aberto osi (open standard interconnection)
            é um modelo conceitualmente robusto e completo, embora não prático
            surgiu independente (antes) dos protocolos
            composto por 7 camadas
                aplicação - apresentação - sessão - transporte - rede - enlace - física
                1: camada física:
                    responsável pela definicção e tratamento dos aspectos físicos na comunicação na rede
                    isso envolve entre outras coisas
                        representação binária dos sinais eletricos
                        definição da voltagem utilizada
                        tempo de duração no pulso elétrico
                        conectores / pinagem
                        meios de transmissão
                            com fio
                                cabo ethernet
                                    ..?
                                cabo coaxial
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
                                fibra óptica
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
                            sem fio
                                rádio frequência
                                later
                                satélite
                                microondas
                    o bit é a unidade de dados da camada
                    multiplexação / comutação
                2: camada enlace:
                    organiza os bits brutos vindos da camada física em estruturas de dados organizados denominados quadros (frames)
                    principais funções
                        enquadramento
                        controle de erros
                        controle de fluxo
                        controle de acesso ao meio
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
                3: camada de rede:
                    controla a operação da subrede
                    a unidade padrão é o pacote
                    funções principais
                        controle de roteamento (estático / dinâmico)
                        controle de congestionamento
                        endereçamento de hosts
                        interconexão de redes heterogênias
                        contabilização de pacotes
                    oferece os serviços SOC e SNOC
                4: camada de transporte:
                    recebe dados vindos da camada de sessão
                    divide-os em unidades menores
                    repassa à camada de rede
                    tipo de serviço oferecido
                        serviço orientado a conexão
                    a camada funciona como um controller da transmissão, assegurando controle e garantia de entrega
                    por isso é considerada fim a fim
                    (obs na camada de rede, os serviços oferecidos são SOC e SNOC)
                5: camada de sessão & 6: camada de apresentação
                    permitem que computadores de arquiteturas diferentes comuniquem se comuniquem (sessão)
                    trata da segurança (criptografia) => apresentação
                7: camada de aplicação
                    é o nível mais alto do modelo
                    é o nível que a maioria dos usuários trabalham
                    aqui são definidos e implementadosos serviços e protocolos de alto nível
        modelo tcp/ip
            é o modelo internet
            criado inicialmente para a arpanet, depois internet
            uma criação dos americanos motivada pelo departamento de defesa
            filosofia do modelo
                a comunicação entre origem e destino deve continuar funcionando, mesmo quando algum enlace intermediário parar de funcionar repentinamente
            diferentemente do protocolo osi, seus protocolos são amplamentes utilizados
            na verdade, o modelos surgiu após os protocolos
            formalmente o modelo possui 4 camadas
                aplicação - transporte - inter-redes - host-rede
            1. nível host-rede
                na prática esse nível não existe implementado no modelo
                a única coisa formal que existe é que os protocolos implementados nesse nível deve ser comunicar e oferecer interface de comunicação com o protocol internet (IP)
                mas tais protocolos não são explicitados
            2. nível inter-rede
                condiderando as diferenças entre os modelos seria equivamente ao nível de redes do OSI
                função principal
                    permitir que os hosts injetem pacotes na rede garantindo que eles trafegarão independentemente
                    oferece SNOC
                    a ordem de entrada dos pacotes não é garantida
                    tem o ip como o principal protocolo da camada
                roteamento é a principal função da camada
                além disso faz o endereçamento ip
            3. nível de transporte
                camada responsável pelo controle de entrega dos pacotes
                dois protocolos são essenciais para a camada
                A) TCP (transmission control protocol)
                    protocolo orientado a conexão
                    mais rígido em relação a entrega de pacotes
                B) UDP (user datagram protocol)
                    protocolo não orientado a conexão
                    mais rápido que TCP
                    indicado para tráfego multimídia
                    prtocolo~não orientado a conexão
            4. nível de aplicação
                o mais alto nível do modelo possui os protocolos e serviços de nível mais alto
                vejamos alguns exemplos
                    DNS
                    HTTP
                    FTP
                    SMTP
                    POP/IMAP
                    SNMP
                    TELNET
                    SSH
                comparação entre os modelos
                    semelhanças
                        ambos baseados em modelos de camadas
                        quando possível a equivalência entre camadas, percebe-se a presença das mesmas funções com algumas excecções
                        do meio pra cima as camadas apresentam muitas semelhanças
                    diferenças
                         o OSI diferencia/reconhece a diferença/conceito dos termos
                            serviço/interface/protocolo (lembra o conceito de POO)
                         o OSI foi concebido antes dos protocolos
                            tem vantagens e desvantagens
                        com o TCP/IP foi o contrário
                            tem vantagens e desvantagens
                        tipos de serviço das camadas de rede e transporte
                        modelo OSI
                            rede
                                SOC
                                SNOC
                            transporte
                                SOC
                        modelo TCP/IP
                            inter-redes
                                SNOC
                            transporte
                                SOC
                                SNOC
                    camada física
                        aspectos relacionados à camada
                            ??
                        alguns apectos tratados pela camada são importantes conhecermos melhor, dentre eles:
                            I  ) meios de transmissão
                                refere-se ao tipo de infraestrutura responsável pela transmissão física dos dados na rede
                                os principais meios de transmissão são
                                A) com fio
                                    A1) cabo par trançado
                                        composto por 1 par de fios de cobre trançados helicoidalmente
                                        podem ser encontrados em diversas quantidades de pares em um mesmo cabo
                                            2, 4, 8, 16, ..., 50, 100, ...
                                        são classificados em
                                            UTP (unshielded twisted pair)
                                            STP (shielded twisted pair)
                                        podem ser classificados também em categora, 3, 4, 5, 6 (5 e 6 são as atuais)
                                        alcançam boas distâncias (KMS)
                                        utilizados em redes locais e telefonia (passado recente)
                                    A2) cabo coaxial
                                    A3) fibra óptica
                                B) sem fio
                                    B1) cardiofrequência
                                    B2) satélite
                                    B3) microondas
                                    B4) laser
                            II ) multiplexação
                            III) comutação
