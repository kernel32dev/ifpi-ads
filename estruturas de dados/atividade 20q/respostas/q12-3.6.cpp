
#include <iostream>
#include <string>
#include "pilha.hpp"
#include "utils.h"

void q12a(const std::string& input, std::string& output);
bool q12b(const std::string& expr);

int main() {
    std::string input, output;
    std::getline(std::cin, input);
    q12a(input, output);
    bool valor = q12b(output);
    std::cout << output << " = " << (valor ? "V" : "F") << std::endl;
}

void q12a(const std::string& input, std::string& output) {
    Pilha<1024> pilha;
    for (char i : input) {
        if (i == '(') {
            // ignora
        } else if (i == ')') {
            output += (char)pilha.desempilhar();
        } else if (i == '&' || i == '|' || i == '~') {
            pilha.empilhar((char)i);
        } else {
            output += i;
        }
    }
    while (!pilha.pilhaVazia()) {
        output += (char)pilha.desempilhar();
    }
}
bool q12b(const std::string& expr) {
    Pilha<1024> pilha;
    for (char i : expr) {
        bool a, b;
        switch (i)
        {
        case 'V':
            pilha.empilhar(1);
            break;
        case 'F':
            pilha.empilhar(0);
            break;
        case '~':
            a = (bool)pilha.desempilhar();
            pilha.empilhar((int)!a);
            break;
        case '&':
            a = (bool)pilha.desempilhar();
            b = (bool)pilha.desempilhar();
            pilha.empilhar((int)(a && b));
            break;
        case '|':
            a = (bool)pilha.desempilhar();
            b = (bool)pilha.desempilhar();
            pilha.empilhar((int)(a || b));
            break;
        }
    }
    return (bool)pilha.desempilhar();
}