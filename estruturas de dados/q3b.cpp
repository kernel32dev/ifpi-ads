
#include <iostream>

using namespace std;

string f1;
string f2;

int main() {
    cout << "Digite a primeira string:";
    getline(cin, f1);
    cout << "Digite a segunda string:";
    getline(cin, f1);

    if (f1 != f2) {
        cout << "São diferentes!!" << endl;
    } else {
        cout << "São iguais!!" << endl;
    }
}
