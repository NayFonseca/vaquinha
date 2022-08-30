let cadastro = document.getElementById("cadastro");
cadastro.addEventListener("submit", function (event) {
    event.preventDefault();
})

let botao = document.getElementById("cadastrar");
botao.addEventListener("click", function (event) {
    insereLinha();
})

let valor = document.getElementById("valor");
valor.addEventListener("change", function (event) {
    atualizaValores();
})

function insereLinha() {
    let alvo = document.querySelector("#participantes tbody");
    let nome = document.getElementById("nome");
    let linha = document.createElement("tr");
    let celNome = document.createElement("td");
    let celValor = document.createElement("td");
    let celPago = document.createElement("td");
    let chkPago = document.createElement("input");
    chkPago.type = "checkbox";
    chkPago.addEventListener("change", function (event) {
        atualizaTotal();
    })
    celPago.appendChild(chkPago);
    let celAcao = document.createElement("td");
    celAcao.innerHTML = "Excluir";
    celAcao.className = "excluir";
    celAcao.addEventListener("click", function (event) {
        if (confirm("Tem certeza que deseja excluir ?")) {
            this.parentElement.remove();
            atualizaValores();
        }
    })
    if (nome.value) {
        celNome.innerHTML = nome.value;
        linha.appendChild(celNome);
        linha.appendChild(celValor);
        linha.appendChild(celPago);
        linha.appendChild(celAcao);
        alvo.appendChild(linha);
        nome.value = "";
        atualizaValores();
    }
}

function atualizaValores() {
    let participantes = document.querySelector("#participantes tbody").children;
    let tabela = document.getElementById("tabela");
    if (participantes.length) {
        tabela.style.display = "block";
        let valor = document.getElementById("valor").value / participantes.length;
        for (linha of participantes) {
            linha.children[1].innerHTML = formataMoeda(valor);
        }
    } else {
        tabela.style.display = "none";
    }
    
    atualizaTotal();
}

function atualizaTotal() {
    let participantes = document.querySelector("#participantes tbody").children;
    let valor = document.getElementById("valor").value / participantes.length;
    let total = 0;
    for(linha of participantes) {
        if(linha.children[2].children[0].checked) {
            total += valor;
        }
    }
    let alvo = document.getElementById("total");
    alvo.innerHTML = "Total arrecadado: " + formataMoeda(total) +"<br>"  + " Total a arrecadar: " + formataMoeda(document.getElementById("valor").value - total);
}



function formataMoeda(valor) {
    let padraoBR = Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
    return padraoBR.format(valor);
}