import { flip, trimStartZeros } from "./utils";

export function crc(input: string, poly: string) {
    const original_input_len = input.length;
    const bits = poly.length - 1;
    input = input.padEnd(bits - (input.length % bits), '0');
    while (true) {
        input = trimStartZeros(input);
        console.log(input.padStart(original_input_len, " "));
        if (input.length <= bits) {
            return input.padStart(bits, "0");
        }
        for (let i = 0; i < poly.length; i++) {
            if (poly[i] == "1") {
                input = flip(input, i);
            }
        }
    }
}

