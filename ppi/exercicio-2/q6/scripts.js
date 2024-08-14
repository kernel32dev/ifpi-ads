document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("newButton").addEventListener("click", function() {
        let hashtag = document.getElementById("newInput").value;
        let opt = document.createElement("option");
        opt.value = hashtag;
        opt.innerText = hashtag;
        let select = document.getElementById("select");
        select.appendChild(opt);
        if (select.children.length > 5) {
            select.firstElementChild.remove();
        }
    });
});