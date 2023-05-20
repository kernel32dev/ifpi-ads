
const lines = [
"ACGTC",
"CGT",
"CCCT",
"AG",
];


function main() {
    for (let i = 0; i < lines.length; i += 2) {
        if (typeof lines[i + 1] === "string") {
            if (esta_contido_em(lines[i], lines[i + 1])) {
                console.log("Resistente");
            } else {
                console.log("Nao resistente");
            }
        }
    }
}

function esta_contido_em(dna, genoma) {
    if (typeof genoma !== "string") {
        return false;
    }
    return dna.indexOf(genoma) !== -1;
}

main();
