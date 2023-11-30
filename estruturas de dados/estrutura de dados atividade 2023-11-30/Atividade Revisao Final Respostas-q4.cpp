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

class Pilha
{
public:
    No *topo;

    Pilha()
    {
        topo = nullptr;
    }

    void push(char n)
    {
        No *novo = new No(n);
        if (topo == nullptr)
        {
            topo = novo;
        }
        else
        {
            novo->prox = topo;
            topo = novo;
        }
    }

    char nomeTopo()
    {
        return topo->nome;
    }
    char pop()
    {
        No *temp;
        char popped;
        if (topo != nullptr)
        {
            temp = topo;
            popped = temp->nome;
            topo = topo->prox;
            delete temp;
        }
        return popped;
    }
    int isEmpty()
    {
        return (topo == nullptr); // retorna 1 se for verdadeiro
    }
};

void verify(std::string str)
{
    // Você pode declarar mais variáveis, se achar necessário
    char par[3][2];
    strcpy(par[0], "()");
    strcpy(par[1], "[]");
    strcpy(par[2], "{}");

    Pilha *pilha = new Pilha();

    for (int i = 0; i < str.length(); i++)
    {
        if (str[i] == par[0][0])
        {
            // item A- complete o algoritmo
            pilha->push(par[0][1]);
        }
        else if (str[i] == par[1][0])
        {
            // item B- complete o algoritmo
            pilha->push(par[1][1]);
        }
        else if (str[i] == par[2][0])
        {
            // item C- complete o algoritmo
            pilha->push(par[2][1]);
        }

        if (str[i] == par[0][1])
        {
            // item D- complete o algoritmo
            if (pilha->pop() != str[i]) {
                std::cout << "INVALIDO" << std::endl;
                return;
            }
        }
        else if (str[i] == par[1][1])
        {
            // item E- complete o algoritmo
            if (pilha->pop() != str[i]) {
                std::cout << "INVALIDO" << std::endl;
                return;
            }
        }
        else if (str[i] == par[2][1])
        {
            // item F- complete o algoritmo
            if (pilha->pop() != str[i]) {
                std::cout << "INVALIDO" << std::endl;
                return;
            }
        }
    }
    // item G- complete o algoritmo
    if (!pilha->isEmpty()) {
        std::cout << "INVALIDO" << std::endl;
        return;
    }
    std::cout << "VALIDO" << std::endl;
}

int main()
{
    std::string str("{a + [b + (2*c*d + 2)]");
    verify(str);
    std::string str2("a + b + (2*c*d + 2)]");
    verify(str2);
    std::string str3("a + b + 2*c*d + 2)]");
    verify(str3);
}
