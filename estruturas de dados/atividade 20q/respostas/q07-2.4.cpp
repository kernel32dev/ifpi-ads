
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

void pd(const Pilha<1024>& input) {
	std::cout << "[" << input.len << "] ";
	for (size_t i = 0; i < input.len; i++) {
		std::cout << input.data[i] << " ";
	}
	std::cout << std::endl;
}

void q7(Pilha<1024>& input, Pilha<1024>& output) {
    while (!input.pilhaVazia()) {
		std::cout << "i: ";
		pd(input);
		std::cout << "o: ";
		pd(output);
		std::cout << std::endl;
        int temp = input.desempilhar();
        while (!output.pilhaVazia() && output.topo() > temp) {
            input.empilhar(output.desempilhar());
        }
        output.empilhar(temp);
    }
}
