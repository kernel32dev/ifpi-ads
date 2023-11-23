
#include <iostream>
#include <string>
#include "pilha.hpp"

bool q8(const std::string&);

int main() {
    std::string line;
    std::getline(std::cin, line);
    if (q8(line)) {
        std::cout << "CORRETO" << std::endl;
    } else {
        std::cout << "ERRO" << std::endl;
    }
}

// retorna true se input tiver todos os (), [] e {}
bool q8(const std::string& input) {
    Pilha<1024> pilha;    
    // para cada caractere no input
    for (char i : input) {
        switch (i) {
            case '(': case '[': case '{':
                pilha.empilhar(i);
            break;
            case ')':
                if (pilha.pilhaVazia() || pilha.desempilhar() != '(') return false;
                break;
            case ']':
                if (pilha.pilhaVazia() || pilha.desempilhar() != '[') return false;
                break;
            case '}':
                if (pilha.pilhaVazia() || pilha.desempilhar() != '{') return false;
                break;
        }
    }
    // retorna true apenas se não tiver pares esperando serem fechados
    return pilha.pilhaVazia();
}