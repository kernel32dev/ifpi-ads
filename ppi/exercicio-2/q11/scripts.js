
/**
 * @typedef {object} Tarefa
 * @property {number} id
 * @property {string} descricao
 * @property {string} dataInicio
 * @property {string} dataConclusao
 */

let idCounter = 0;

/** @type {Tarefa[]} */
const tarefas = [];

document.addEventListener("DOMContentLoaded", function() {
    const descricaoTarefa = document.getElementById("descricaoTarefa");
    const adicionarBtn = document.getElementById("adicionarBtn");
    const tabelaTarefas = document.getElementById("tabelaTarefas");

    adicionarBtn.addEventListener("click", function() {
        const descricao = descricaoTarefa.value.trim();
        const tarefa = {
            id: idCounter++,
            descricao: descricao,
            dataInicio: now(),
            dataConclusao: ""
        };
        tarefas.push(tarefa);
        criaTableRow(tarefa);
    });

    /** @param {Tarefa} object  */
    function criaTableRow(object) {
        const tr = document.createElement("tr");
        const id = object.id;
        tr.dataset.id = id;
        const concluirBtn = document.createElement("button");
        concluirBtn.classList.add("concluirBtn");
        concluirBtn.innerText = "Concluir";
        concluirBtn.addEventListener("click", function() {
            this.disabled = true;
            const index = tarefas.findIndex(x => x.id == id);
            if (index != -1) tarefas.splice(index, 1);
            object.dataConclusao = now();
            document.querySelector(`tr[data-id="${id}"]`).children[3].innerText = object.dataConclusao;
        });
        const excluirBtn = document.createElement("button");
        excluirBtn.classList.add("excluirBtn");
        excluirBtn.innerText = "Excluir";
        excluirBtn.addEventListener("click", function() {
            const index = tarefas.findIndex(x => x.id == id);
            if (index != -1) tarefas.splice(index, 1);
            document.querySelector(`tr[data-id="${id}"]`).remove();
        });
        tr.append(
            criaCelula(object.id),
            criaCelula(object.descricao),
            criaCelula(object.dataInicio),
            criaCelula(object.dataConclusao),
            criaCelula(concluirBtn, " ", excluirBtn),
        );
        tabelaTarefas.lastElementChild.append(tr);
    }
    function criaCelula(...conteudo) {
        const td = document.createElement("td");
        td.append(...conteudo);
        return td;
    }
});

function now() {
    return new Date().toLocaleString();
}
