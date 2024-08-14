
#include <iostream>
#include <queue>

#define assert(expression, message) if (!(expression)) { std::cout << "assertion failed at " << __LINE__ << ": " << message << std::endl; std::abort(); }
struct NodePrintHelper;

struct Node {
    int value;
    Node* left;
    Node* right;
    Node() : value(0), left(nullptr), right(nullptr) {}
    Node(int value) : value(value), left(nullptr), right(nullptr) {}
    Node(int value, Node* left, Node* right) : value(value), left(left), right(right) {}
    ~Node() {
        if (left) delete left;
        if (right) delete right;
    }
    bool has_any() {
        return left || right;
    }

    void insert(int new_value) {
        if (new_value < value) {
            if (left) {
                left->insert(new_value);
            } else {
                left = new Node(new_value);
            }
        } else if (new_value > value) {
            if (right) {
                right->insert(new_value);
            } else {
                right = new Node(new_value);
            }
        }
    }
    Node* search(int target) {
        if (value < target) {
            if (left) return left->search(target);
        } else if (value > target) {
            if (right) return right->search(target);
        } else {
            return this;
        }
        return nullptr;
    }
    void remove_left() {
        if (!left) return;
        Node* l = left->left;
        Node* r = left->right;
        left->left = nullptr;
        left->right = nullptr;
        delete left;
        left = nullptr;
        if (!l || !r) {
            left = l ? l : r;
            return;
        }
        assert(false, "TODO!");
    }
    void remove_right() {
        assert(false, "TODO!");
    }
    void remove_minimum() {
        if (!left) {
            // esse nodo é o mínimo
            assert(right, "não pode chamar remove_minimum em um nodo sem filhos");
            value = right->value;
            delete right;
            right = nullptr;
        } else if (!left->has_any()) {
            // o mínimo está a esquerda e não tem filhos
            delete left;
            left = nullptr;
        } else {
            left->remove_minimum();
        }
    }
    void remove_maximum() {
        if (!right) {
            // esse nodo é o máximo
            assert(left, "não pode chamar remove_maximum em um nodo sem filhos");
            value = left->value;
            delete left;
            left = nullptr;
        } else if (!right->has_any()) {
            // o máximo está a direita e não tem filhos
            delete right;
            right = nullptr;
        } else {
            right->remove_maximum();
        }
    }
    void depth_first_lvr() {
        if (left) left->depth_first_lvr();
        std::cout << value << ' ';
        if (right) right->depth_first_lvr();
    }

    void print(int depth, char prefix = 'A') {
        for (int i = 0; i < depth; i++) {
            std::cout << "|   ";
        }
        if (this) {
            std::cout << prefix << ' ' << value << std::endl;
            if (has_any()) {
                left->print(depth + 1, 'L');
                right->print(depth + 1, 'R');
            }
        } else {
            std::cout << prefix << " x" << std::endl;
        }
    }
};

struct Arvore {
    Node* root;
    Arvore() : root(nullptr) {}
    Arvore(Node* root) : root(root) {}
    void insert(int value) {
        if (!root) {
            root = new Node(value);
        } else {
            root->insert(value);
        }
    }
    Node* search_recursive(int target) {
        if (!root) return nullptr;
        return root->search(target);
    }
    Node* search_iterative(int target) {
        Node* p = root;
        while (p) {
            if (target < p->value) {
                p = p->left;
            } else if (target > p->value) {
                p = p->right;
            } else {
                return p;
            }
        }
        return nullptr;
    }
    bool remove_minimum() {
        if (!root) return false;
        if (root->has_any()) {
            root->remove_minimum();
        } else {
            delete root;
            root = nullptr;
        }
        return true;
    }
    bool remove_maximum() {
        if (!root) return false;
        if (root->has_any()) {
            root->remove_maximum();
        } else {
            delete root;
            root = nullptr;
        }
        return true;
    }
    // percurso em extensão
    void breadth_first_iteration() {
        if (!root) return;
        std::queue<Node*> queue;
        queue.push(root);
        while (!queue.empty()) {
            Node* i = queue.front();
            queue.pop();
            std::cout << i->value << ' ';
            if (i->right) queue.push(i->right);
            if (i->left) queue.push(i->left);
        }
        std::cout << std::endl;
    }
    void depth_first_lvr() {
        if (root) root->depth_first_lvr();
    }
    void print() {
        if (root) {
            root->print(0);
        } else {
            std::cout << "<empty>" << std::endl;
        }
    }
};

int main() {
    Arvore a;

    // for (int i = 0; i < 2000; i++) std::rand();
    // for (int i = 0; i < 10; i++) a.insert(std::rand() & 255);

    a.insert(50);
    a.insert(30);
    a.insert(20);
    a.insert(100);
    a.insert(120);
    a.insert(80);
    a.insert(60);
    a.insert(90);

    a.print();
    a.breadth_first_iteration();
    std::cout << std::endl;
}
