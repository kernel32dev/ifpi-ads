
#include <iostream>
#include <string>
#include "pilha.hpp"

void q6(std::string&);

int main() {
    std::string line;
    std::getline(std::cin, line);
    q6(line);
    std::cout << line << std::endl;
}

void q6(std::string& input) {
    Pilha<1024> pilha;
    for (char c : input) {
        pilha.empilhar(c);
    }
    input.clear();
    while (!pilha.pilhaVazia()) {
        input += (char)pilha.desempilhar();
    }
}