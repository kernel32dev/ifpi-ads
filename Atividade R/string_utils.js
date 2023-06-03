
export function str_substr(text, start, length) {
    let output = "";
    if (start >= text.length) {
        return "";
    }
    if (length === undefined || length > text.length - start) {
        length = text.length - start;
    }
    for (let i = start; i < start + length; i++) {
        output += text[i];
    }
    return output;
}

export function str_find(haystack, find, index = 0) {
    let found = 0;
    for (; index < haystack.length; index++) {
        if (haystack[index] === find[found]) {
            found++;
            if (found === find.length) {
                return index - find.length + 1;
            }
        }
    }
    return -1;
}

export function str_replace(haystack, find, replace) {
    let output = "";
    let index = 0;
    while (true) {
        let next_index = str_find(haystack, find, index);
        if (next_index === -1) break;
        output += str_substr(haystack, index, next_index - index);
        output += replace;
        index = next_index + find.length;
    }
    output += str_substr(haystack, index);
    return output;
}
