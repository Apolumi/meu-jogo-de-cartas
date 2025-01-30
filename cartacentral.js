const tiposCartas = ["morte", "facas", "sol", "lua"];
const cartaCentral = document.getElementById("carta-central");

// Função para gerar uma carta aleatória
function gerarCartaCentral() {
    let tipoAleatorio = tiposCartas[Math.floor(Math.random() * tiposCartas.length)];
    cartaCentral.style.backgroundImage = `url('img/${tipoAleatorio}.webp')`;
}

// Inicializa a carta central
gerarCartaCentral();
