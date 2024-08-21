
#include <iostream>
#include <queue>

#define assert(expression, message) if (!(expression)) { std::cout << "assertion failed at " << __LINE__ << ": " << message << std::endl; std::abort(); }

template<typename T>
struct Node {
    T value;
    Node* left;
    Node* right;
    Node() : value(0), left(nullptr), right(nullptr) {}
    Node(T value) : value(value), left(nullptr), right(nullptr) {}
    Node(T value, Node* left, Node* right) : value(value), left(left), right(right) {}
    ~Node() {
        if (left) delete left;
        if (right) delete right;
    }
    bool has_any() {
        return left || right;
    }
    void insert(T new_value) {
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
    Node* search(T target) {
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

    int profundidade() {
        if (!this) return 0;
        return 1 + std::max(left->profundidade(), right->profundidade());
    }
    int fator_balanceamento() {
        if (!this) return 0;
        return right->profundidade() - left->profundidade();
    }
};

template <typename T>
void rotate_left(Node<T>*& node) {
    Node<T>* new_root = node->right;
    node->right = new_root->left;
    new_root->left = node;
    node = new_root;
}

template <typename T>
void rotate_right(Node<T>*& node) {
    Node<T>* new_root = node->left;
    node->left = new_root->right;
    new_root->right = node;
    node = new_root;
}

template<typename T>
struct Arvore {
    Node<T>* root;
    Arvore() : root(nullptr) {}
    Arvore(Node<T>* root) : root(root) {}
    void clear() {
        if (root) delete root;
        root = nullptr;
    }
    template <typename Arg>
    void insert(Arg value) {
        if (!root) {
            root = new Node(value);
            return;
        }
        root->insert(value);
        switch (root->fator_balanceamento()) {
        case -2:
            if (root->left->fator_balanceamento() <= 0) {
                rotate_right(root);
            } else {
                rotate_left(root->left);
                rotate_right(root);
            }
            break;
        case 2:
            if (root->right->fator_balanceamento() >= 0) {
                rotate_left(root);
            } else {
                rotate_right(root->right);
                rotate_left(root);
            }
            break;
        }
    }
    template <typename ...Args>
    void insert(Args... values) {
        (insert(values),...);
    }
    Node<T>* search_recursive(T target) {
        if (!root) return nullptr;
        return root->search(target);
    }
    Node<T>* search_iterative(T target) {
        Node<T>* p = root;
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
        std::queue<Node<T>*> queue;
        queue.push(root);
        while (!queue.empty()) {
            Node<T>* i = queue.front();
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
    Arvore<int> ia;

    std::cout << "======\n";
    ia.clear();
    ia.insert(8, 4, 10, 9, 15);
    ia.print();
    std::cout << "+ 12\n";
    ia.insert(12);
    ia.print();

    std::cout << "======\n";
    ia.clear();
    ia.insert(8, 4, 10, 2, 6);
    ia.print();
    std::cout << "+ 5\n";
    ia.insert(5);
    ia.print();

    std::cout << "======\n";
    ia.clear();
    ia.insert(35, 39, 51, 20, 13, 28, 22, 32);
    ia.print();
    std::cout << "+ 25\n";
    ia.insert(25);
    ia.print();
    std::cout << "+ 33\n";
    ia.insert(33);
    ia.print();
}

/*int main() {
    Arvore<int> ia;

    // for (int i = 0; i < 2000; i++) std::rand();
    // for (int i = 0; i < 10; i++) a.insert(std::rand() & 255);

    std::cout << "======\nCaso 1\n";

    ia.clear();
    ia.insert(8, 4, 10, 9, 15);
    ia.insert(12);

    ia.print();
    std::cout << "profundidade à esquerda: " << 1 + ia.root->left->profundidade() << "\n";
    std::cout << "profundidade à direita: " << 1 + ia.root->right->profundidade() << "\n";
    std::cout << "fator de balanceamento: " << ia.root->fator_balanceamento() << "\n";

    std::cout << "Rotação a esquerda\n";

    //rotate_left(ia.root);

    //ia.print();
    //std::cout << "profundidade à esquerda: " << 1 + ia.root->left->profundidade() << "\n";
    //std::cout << "profundidade à direita: " << 1 + ia.root->right->profundidade() << "\n";
    //std::cout << "fator de balanceamento: " << ia.root->fator_balanceamento() << "\n";

    std::cout << "======\nCaso 2\n";
    
    ia.clear();
    ia.insert(8, 4, 10, 2, 6);
    ia.insert(5);

    ia.print();
    std::cout << "profundidade à esquerda: " << 1 + ia.root->left->profundidade() << "\n";
    std::cout << "profundidade à direita: " << 1 + ia.root->right->profundidade() << "\n";
    std::cout << "fator de balanceamento: " << ia.root->fator_balanceamento() << "\n";

    std::cout << "Rotação a direita\n";

    std::cout << "======\nCaso 38\n";
    ia.clear();
    ia.insert(35, 39, 51, 20, 13, 28, 22, 32);

    ia.print();
    std::cout << "profundidade à esquerda: " << 1 + ia.root->left->profundidade() << "\n";
    std::cout << "profundidade à direita: " << 1 + ia.root->right->profundidade() << "\n";
    std::cout << "fator de balanceamento: " << ia.root->fator_balanceamento() << "\n";
    
    ia.insert(25, 33);

    ia.print();
    std::cout << "profundidade à esquerda: " << 1 + ia.root->left->profundidade() << "\n";
    std::cout << "profundidade à direita: " << 1 + ia.root->right->profundidade() << "\n";
    std::cout << "fator de balanceamento: " << ia.root->fator_balanceamento() << "\n";
    
}*/
