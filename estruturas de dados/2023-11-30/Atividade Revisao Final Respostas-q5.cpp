#include <string>
#include <cstring>
#include <iostream>
class No
{
public:
    char nome;
    No *prox;
    No(char n)
    {
        nome = n;
        prox = nullptr;
    }
};

class Fila
{
public:
    No *inicio;
    No *fim;
    Fila()
    {
        inicio = nullptr;
        fim = nullptr;
    }

    // inserir um elemento no topo da fila
    void insereNaFila(char n)
    {
        No *novo = new No(n);
        if (inicio == nullptr)
        { // fila vazia
            inicio = novo;
            fim = novo;
        }
        else
        { // insere o elemento e modifica o topo
            fim->prox = novo;
            fim = novo;
        }
    }

    // retirar o elemento do topo
    char retiraDaFila()
    {
        No *el;
        char nome;
        if (inicio != nullptr)
        {
            el = inicio;
            nome = el->nome;
            inicio = inicio->prox;
            delete el;
        }
        return nome;
    }

    int fila_vazia()
    {
        return (inicio == nullptr);
    }

    void mostra()
    {
        No *atual;
        atual = inicio;

        std::cout << "\n\n--------Mostra a Fila---------------\n\n";
        while (atual != nullptr)
        {
            printf("\nNome %c\n", atual->nome);
            atual = atual->prox;
        }
    }
};

int main()
{
    Fila *f1 = new Fila();
    Fila *f2 = new Fila();
    int resp;
    char letra;
    do
    {
        std::cout << "\nDigite a letra:";
        std::cin >> letra; // Cada letra lida deve ser empilhada, mas so e possível
                      //  usar os metodos da classe Fila
        // Implemente a resposta da questao aqui

        while (!f1->fila_vazia()) {
            f2->insereNaFila(f1->retiraDaFila());
        }
        f1->insereNaFila(letra);
        while (!f2->fila_vazia()) {
            f1->insereNaFila(f2->retiraDaFila());
        }

        std::cout << "\nDeseja continuar (1-Sim 2-Nao)?";
        std::cin >> resp;
    } while (resp == 1);
    std::cout << "topo da pilha" << std::endl;
    while (!f1->fila_vazia()) {
        std::cout << f1->retiraDaFila() << std::endl;
    }
    std::cout << "fim da pilha" << std::endl;
}