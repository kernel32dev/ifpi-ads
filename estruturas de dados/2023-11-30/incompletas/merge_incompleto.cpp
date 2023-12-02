#include<stdio.h>
#include<iostream>
using namespace std;
void intercala(int vetor[], int inicio, int meio, int fim);
void merge_sort(int v[],int inicio, int fim);

int main(){
   int vetor[6] = {7, 9, 4, 3,6,1};
   int i;   



   printf("\n2.Vetor ordenado:\n");
   for(i = 0; i <= 5; i++){
      printf("%d ", vetor[i]);
   }
   printf("\n");   
}


