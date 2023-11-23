
#include <iostream>
#include <string>
#include "pilha.hpp"

void q11(const std::string& input, std::string& output);

int main() {
    std::string input, output;
    std::getline(std::cin, input);
    q11(input, output);
    std::cout << output << std::endl;
}

void q11(const std::string& input, std::string& output) {
    Pilha<1024> pilha;
    for (char i : input) {
        if (i == '(') {
            // ignora
        } else if (i == ')') {
            output += (char)pilha.desempilhar();
        } else if (i == '+' || i == '-' || i == '*' || i == '/' || i == '\\') {
            pilha.empilhar((char)i);
        } else {
            output += i;
        }
    }
    while (!pilha.pilhaVazia()) {
        output += (char)pilha.desempilhar();
    }
}