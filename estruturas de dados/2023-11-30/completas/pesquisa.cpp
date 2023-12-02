#include <stdio.h>
#include <iostream>
#include <string.h>
#include <vector>
#include <string>

using namespace std;
int pesquisa_linear(int x, int v[], int n);
int pesquisa_binaria(int x, int v[], int n);

int main()
{
    // A. Leia os valores através do teclado
    // B. Armazene os valores no vetor de dados
    vector<int> valores;
    std::cout << "especifique um valor por linha\n para encerrar aperte enter em uma linha vazia" << std::endl;
    while (true)
    {
        string line;
        getline(cin, line);
        if (line.empty())
            break;
        valores.push_back(atoi(line.c_str()));
    }
    // C. leia o valor que deseja procurar
    int procurado;
    std::cout << "especifique o valor a procurar: ";
    std::cin >> procurado;
    // D. Aplique a pesquisa linear
    int linear = pesquisa_linear(procurado, valores.data(), valores.size());
    // E. Apresente o resultado
    std::cout << "pesquisa_linear retornou " << linear << std::endl;
    // F. Aplique a pesquisa binária
    int binaria = pesquisa_binaria(procurado, valores.data(), valores.size());
    // G. Apresente o resultado
    std::cout << "pesquisa_binaria retornou " << binaria << std::endl;
}

int pesquisa_linear(int x, int v[], int n)
{
    for (int i = 0; i < n; i++)
    {
        if (v[i] == x)
        {
            return i;
        }
    }
    return -1;
}
int pesquisa_binaria(int x, int v[], int n)
{
    int a = 0, b = n - 1;
    while (a <= b)
    {
        int m = (a + b) / 2;
        if (x > v[m])
            a = m + 1;
        else if (x < v[m])
            b = m - 1;
        else
            return m;
    }
    return -1;
}
