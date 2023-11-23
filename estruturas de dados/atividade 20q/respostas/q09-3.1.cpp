
#include <iostream>
#include <string>
#include "pilha.hpp"

void q9a(const std::string& input, std::string& output);
int q9b(const std::string& expr);

int main() {
    std::string input, output;
    std::getline(std::cin, input);
    q9a(input, output);
    int valor = q9b(output);
    std::cout << output << " = " << valor << std::endl;
}

void q9a(const std::string& input, std::string& output) {
    Pilha<1024> pilha;
    for (char i : input) {
        if (i == '(') {
            // ignora
        } else if (i == ')') {
            output += (char)pilha.desempilhar();
        } else if (i == '+' || i == '-' || i == '*' || i == '/' || i == '\\') {
            output += ' ';
            pilha.empilhar((char)i);
        } else {
            output += i;
        }
    }
    while (!pilha.pilhaVazia()) {
        output += (char)pilha.desempilhar();
    }
}
int q9b(const std::string& expr) {
    Pilha<1024> pilha;
    bool inint = false;
    for (char i : expr) {
        if (i >= '0' && i <= '9') {
            if (inint) {
                int topo = pilha.desempilhar();
                topo = topo * 10 + (i - '0');
                pilha.empilhar(topo);
            } else {
                inint = true;
                pilha.empilhar(i - '0');
            }
            continue;
        }
        inint = false;
        int a, b;
        switch (i)
        {
        case '+':
            a = pilha.desempilhar();
            b = pilha.desempilhar();
            pilha.empilhar(a + b);
            break;
        case '-':
            a = pilha.desempilhar();
            b = pilha.desempilhar();
            pilha.empilhar(a - b);
            break;
        case '*':
            a = pilha.desempilhar();
            b = pilha.desempilhar();
            pilha.empilhar(a * b);
            break;
        case '/':
        case '\\':
            a = pilha.desempilhar();
            b = pilha.desempilhar();
            pilha.empilhar(a / b);
            break;
        }
    }
    return pilha.desempilhar();
}