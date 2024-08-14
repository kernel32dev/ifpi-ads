document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("btnRun").addEventListener("click", function () {
        let i = document.getElementById("fileInput");
        let o = document.getElementById("resultado");
        console.log({i, o, file: i.files[o]});
        o.src = URL.createObjectURL(i.files[0])
    });
});
