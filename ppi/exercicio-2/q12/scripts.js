
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

    const popupScreen = document.getElementById("popupScreen");
    const popupCard = document.getElementById("popupCard");
    const excluirBtn = document.getElementById("excluirBtn");
    const cancelarBtn = document.getElementById("cancelarBtn");

    adicionarBtn.addEventListener("click", function() {
        const descricao = descricaoTarefa.value.trim();
        if (descricao) {
            const tarefa = {
                id: idCounter++,
                descricao: descricao,
                dataInicio: now(),
                dataConclusao: ""
            };
            tarefas.push(tarefa);
            criaTableRow(tarefa);
        }
    });

    /** @param {Tarefa} object  */
    function criaTableRow(object) {
        const tr = document.createElement("tr");
        const id = object.id;
        tr.dataset.id = id;
        const concluirBtn = document.createElement("button");
        const excluirBtn = document.createElement("button");
        concluirBtn.classList.add("concluirBtn");
        concluirBtn.innerText = "Concluir";
        concluirBtn.addEventListener("click", function() {
            if (concluirBtn.classList.contains("concluirBtn")) {
                concluirBtn.classList.add("reabrirBtn");
                concluirBtn.classList.remove("concluirBtn");
                concluirBtn.innerText = "Reabrir";
                excluirBtn.disabled = true;

                const index = tarefas.findIndex(x => x.id == id);
                if (index != -1) tarefas.splice(index, 1);
                object.dataConclusao = now();
                document.querySelector(`tr[data-id="${id}"]`).children[3].innerText = object.dataConclusao;
            } else {
                concluirBtn.classList.add("concluirBtn");
                concluirBtn.classList.remove("reabrirBtn");
                concluirBtn.innerText = "Concluir";
                excluirBtn.disabled = false;

                const index = tarefas.findIndex(x => x.id == id);
                if (index != -1) tarefas.splice(index, 1);
                object.dataConclusao = now();
                document.querySelector(`tr[data-id="${id}"]`).children[3].innerText = "";
            }
        });
        excluirBtn.classList.add("excluirBtn");
        excluirBtn.innerText = "Excluir";
        excluirBtn.addEventListener("click", function() {
            confirma(function() {
                const index = tarefas.findIndex(x => x.id == id);
                if (index != -1) tarefas.splice(index, 1);
                document.querySelector(`tr[data-id="${id}"]`).remove();
            });
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
    function now() {
        return new Date().toLocaleString();
    }
    /*popupScreen
popupCard
excluirBtn
cancelarBtn */
    function confirma(callback) {
        popupScreen.classList.remove("hide");
        excluirBtn.addEventListener("click", confirm);
        popupScreen.addEventListener("click", dismiss);
        cancelarBtn.addEventListener("click", dismiss);
        function confirm() {
            callback();
            dismiss();
        }
        function dismiss() {
            popupScreen.classList.add("hide");
            excluirBtn.removeEventListener("click", confirm);
            popupScreen.removeEventListener("click", dismiss);
            cancelarBtn.removeEventListener("click", dismiss);
        }
    }
});
