

int main() {
    long long counter = 0;
    float num = 8.0f;
    while (num > 0) {
        counter++;
        num /= 2.0f;
        printf("num: %f\n", num);
    }
    printf("counter: %lli\n", counter);
}