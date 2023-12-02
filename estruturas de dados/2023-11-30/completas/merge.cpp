#include<stdio.h>
#include<iostream>
using namespace std;
void intercala(int vetor[], int inicio, int meio, int fim);
void merge_sort(int v[],int inicio, int fim);

int main(){
   int vetor[6] = {7, 9, 4, 3,6,1};
   int i;   

   merge_sort(vetor, 0, 5);

   printf("\n2.Vetor ordenado:\n");
   for(i = 0; i <= 5; i++){
      printf("%d ", vetor[i]);
   }
   printf("\n");   
}


void intercala(int vetor[], int inicio, int meio, int fim) {
   int *temp = new int[fim - inicio + 1];
   int *p = temp;
   int i = inicio;
   int j = meio + 1;
   while (i <= meio && j <= fim) {
      if (vetor[i] > vetor[j]) {
         (*p++) = vetor[j++];
      } else if (vetor[i] < vetor[j]) {
         (*p++) = vetor[i++];
      } else {
         (*p++) = vetor[i++];
         (*p++) = vetor[j++];
      }
   }
   while (i <= meio) {
      (*p++) = vetor[i++];
   }
   while (j <= fim) {
      (*p++) = vetor[j++];
   }
   memcpy(vetor + inicio, temp, (fim - inicio + 1) * sizeof(int));
   delete[] temp;
}
void merge_sort(int v[],int inicio, int fim) {
   if (inicio >= fim) return;
   int m = (inicio + fim) / 2;
   merge_sort(v, inicio, m);
   merge_sort(v, m + 1, fim);
   intercala(v, inicio, m, fim);
}