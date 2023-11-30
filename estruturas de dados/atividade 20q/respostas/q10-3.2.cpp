
#include <iostream>
#include <string>
#include "pilha.hpp"

void q10a(const std::string& input, std::string& output);
int q10b(const std::string& expr);
int prio(char);

int main() {
    std::string input, output;
    std::getline(std::cin, input);
    q10a(input, output);
    int valor = q10b(output);
    std::cout << output << " = " << valor << std::endl;
}

void q10a(const std::string& input, std::string& output) {
    Pilha<1024> pilha;
    for (char i : input) {
        if (i == '(') {
            pilha.empilhar('(');
        } else if (i == ')') {
            while (true) {
                char topo = (char)pilha.desempilhar();
                if (topo != '(') break;
                output += topo;
            }
        } else if (i == '+' || i == '-' || i == '*' || i == '/') {
            while (!pilha.pilhaVazia() && prio(pilha.topo()) > prio(i)) {
                output += (char)pilha.desempilhar();
            }
            output += ' ';
            pilha.empilhar((int)i);
        } else {
            output += i;
        }
    }
    while (!pilha.pilhaVazia()) {
        output += (char)pilha.desempilhar();
    }
}
int q10b(const std::string& expr) {
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
            a = pilha.desempilhar();
            b = pilha.desempilhar();
            pilha.empilhar(a / b);
            break;
        }
    }
    return pilha.desempilhar();
}

int prio(char val) {
    switch (val) {
        case '(': return 0;
        case '+':
        case '-': return 1;
        case '*':
        case '/': return 2;
    }
    return -1;
}