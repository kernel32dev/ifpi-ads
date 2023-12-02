#include <stdio.h>
#include <stdlib.h>

void bolha(int n, int *v)
{
	for (int i = n - 1;i >= 1; i--) {
		bool flag = false;
		for (int j = 0; j < i; j++) {
			if (v[j] > v[j + 1]) {
				int temp = v[j];
				v[j] = v[j + 1];
				v[j + 1] = temp;
				flag = true;
			}
		}
		if (!flag) break;
	}
}

void PesquisaBinaria(int n, int *v, int procurado)
{
	while (true) {
		int m = n / 2;
		if (procurado > v[m]) {
			v += m + 1;
			n -= m + 1;
			if (n < 0) {
				printf("valor %d ausente\n", procurado);
				return;
			}
		} else if (procurado < v[m]) {
			if (n == 0) {
				printf("valor %d ausente\n", procurado);
				return;
			}
			n = m;
		} else {
			printf("valor %d presente\n", procurado);
			return;
		}
	}
}

int main()
{
	int v[4];
	for (int i = 0; i <= 3; i = i + 1)
	{
		printf("Digite o valor %d :", i);
		scanf("%d", &v[i]);
	}

	// ordene o vetor V usando o método da bolha
	bolha(4, v);
	// mostre o vetor ordenado
	for (int i = 0; i <= 3; i = i + 1)
	{
		printf("v[%i] = %i\n", i, v[i]);
	}
	// pesquise no vetor usando o metodo de pesquisa binaria
	int procurado;
	printf("Digite o valor a procurar:");
	scanf("%d", &procurado);
	PesquisaBinaria(4, v, procurado);
}
