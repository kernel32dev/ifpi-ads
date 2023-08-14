
export function map(vector, func) {
    const arr = Array(vector.length);
    for (let i = 0; i < vector.length; i++) {
        arr[i] = func(vector[i]);
    }
    return arr;
}

export function filter(vector, func) {
    const arr = [];
    for (let i = 0; i < vector.length; i++) {
        if (func(vector[i])) {
            arr[arr.length] = vector[i];
        }
    }
    return arr;
}

export function reduce(vector, func, accumulator) {
    if (vector.length === 0) {
        return accumulator;
    }
    let i = 0;
    if (accumulator === undefined) {
        accumulator = vector[i++];
    }
    for (; i < vector.length; i++) {
        accumulator = func(accumulator, vector[i]);
    }
    return accumulator;
}

export function zip(a, b) {
    const arr = Array(Math.min(a.length, b.length));
    for (let i = 0; i < arr.length; i++) {
        arr[i] = [a[i], b[i]];
    }
    return arr;
}

export function sum(vector) {
    return reduce(vector, (x, y) => x + y);
}

export function choose_random(vector) {
    if (vector.length === 0) {
        return undefined;
    }
    if (vector.length === 1) {
        return vector[0];
    }
    return vector[Math.floor(Math.random() * vector.length)];
}

export function sort(vector, reverse = false) {
    // bubble sort
    const arr = Array(vector.length);
    for (let i = 0; i < vector.length; i++) {
        arr[i] = vector[i];
    }
    let trocou = true;
    for (let max = arr.length - 1; max >= 0 && trocou; max--) {
        trocou = false;
        for (let i = 0; i < max; i++) {
            let troca;
            if (!reverse) {
                troca = arr[i] > arr[i + 1];
            } else {
                troca = arr[i] < arr[i + 1];
            }
            if (troca) {
                trocou = true;
                const temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
    }
    return arr;
}
