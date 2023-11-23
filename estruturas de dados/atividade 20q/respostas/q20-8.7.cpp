
#include "utils.h"

bool binarySearch(int x, const int* v, size_t p, size_t u) {
    if (p > u) return false;
    size_t m = (p + u) / 2;
    if (x > v[m]) {
        return binarySearch(x, v, m + 1, u);
    } else if (x < v[m]) {
        if (m == 0) return false;
        return binarySearch(x, v, p, m - 1);
    } else {
        return true;
    }
}

int main() {
    const int arr[8] = {1, 5, 7, 10, 43, 155, 1595, 1600};

    assert(binarySearch(1, arr, 0, 7));
    assert(binarySearch(5, arr, 0, 7));
    assert(binarySearch(7, arr, 0, 7));
    assert(binarySearch(10, arr, 0, 7));
    assert(binarySearch(43, arr, 0, 7));
    assert(binarySearch(155, arr, 0, 7));
    assert(binarySearch(1595, arr, 0, 7));
    assert(binarySearch(1600, arr, 0, 7));

    assert(!binarySearch(1 - 1, arr, 0, 7));
    assert(!binarySearch(5 - 1, arr, 0, 7));
    assert(!binarySearch(7 - 1, arr, 0, 7));
    assert(!binarySearch(10 - 1, arr, 0, 7));
    assert(!binarySearch(43 - 1, arr, 0, 7));
    assert(!binarySearch(155 - 1, arr, 0, 7));
    assert(!binarySearch(1595 - 1, arr, 0, 7));
    assert(!binarySearch(1600 - 1, arr, 0, 7));

    assert(!binarySearch(1 + 1, arr, 0, 7));
    assert(!binarySearch(5 + 1, arr, 0, 7));
    assert(!binarySearch(7 + 1, arr, 0, 7));
    assert(!binarySearch(10 + 1, arr, 0, 7));
    assert(!binarySearch(43 + 1, arr, 0, 7));
    assert(!binarySearch(155 + 1, arr, 0, 7));
    assert(!binarySearch(1595 + 1, arr, 0, 7));
    assert(!binarySearch(1600 + 1, arr, 0, 7));
}
