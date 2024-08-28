import { crc } from "./crc";
import * as hamming from "./hamming";
import { flip, rng } from "./utils";

function test_hamming() {
    const mensagem = "01100110101101";
    const encoded = hamming.encode(mensagem);
    const corrupted = flip(encoded, rng(encoded.length));
    const decoded = hamming.decode(corrupted);
    
    console.log("=== HAMMING ===");
    console.log("mensagem:  " + mensagem);
    console.log("encoded:   " + encoded);
    console.log("corrupted: " + corrupted);
    console.log("decoded:   " + decoded);
    console.log("mensagem == decoded: " + (mensagem == decoded));
}

function test_crc() {
    const mensagem = "01100110101101";
    const polynomial = "110010";
    const redundancy = crc(mensagem, polynomial);
    const encoded = mensagem + redundancy;
    const corrupted = flip(encoded, rng(encoded.length));
    //const corrupted = encoded;
    const redundancy2 = crc(corrupted, polynomial);

    console.log("===   CRC   ===");
    console.log("mensagem:    " + mensagem);
    console.log("polynomial:  " + polynomial);
    console.log("redundancy:  " + redundancy);
    console.log("encoded:     " + encoded);
    console.log("corrupted:   " + corrupted);
    console.log("redundancy2: " + redundancy2 + (+redundancy2 == 0 ? " (ok)": " (err)"));
}

test_hamming();
test_crc();