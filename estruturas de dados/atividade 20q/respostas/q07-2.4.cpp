
#include <iostream>
#include <string>
#include "pilha.hpp"

void q7(Pilha<1024>&, Pilha<1024>&);

int main() {
    Pilha<1024> input, output;
    while (true) {
        std::string line;
        std::getline(std::cin, line);
        if (line.empty()) break;
        input.empilhar(std::atoi(line.c_str()));
    }
    q7(input, output);
    while (!output.pilhaVazia()) {
        std::cout << output.desempilhar() << " ";
    }
    std::cout << std::endl;
}

void q7(Pilha<1024>& input, Pilha<1024>& output) {
    while (!input.pilhaVazia()) {
        int temp = input.desempilhar();
        while (!output.pilhaVazia() && output.topo() > temp) {
            input.empilhar(output.desempilhar());
        }
        output.empilhar(temp);
    }
}