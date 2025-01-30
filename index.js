const tiposCartas = ["morte", "facas", "sol", "lua"];
const deck = document.getElementById("deck");
const dinheiroElement = document.getElementById("dinheiro");
let dinheiro = 100; // Dinheiro inicial do jogador

// Função para gerar 8 cartas aleatórias
function gerarCartas() {
    let cartas = [];
    for (let i = 0; i < 8; i++) {
        let tipoAleatorio = tiposCartas[Math.floor(Math.random() * tiposCartas.length)];
        cartas.push(tipoAleatorio);
    }
    return cartas;
}

// Renderiza as cartas na tela
function exibirCartas(cartas) {
    deck.innerHTML = ""; // Limpa o deck para exibir novas cartas
    cartas.forEach((tipo) => {
        let carta = document.createElement("div");
        carta.classList.add("card");
        carta.style.backgroundImage = `url('img/${tipo}.webp')`;
        carta.dataset.tipo = tipo;
        carta.dataset.virada = "false"; // Estado inicial

        // Adiciona evento de clique para virar/desvirar
        carta.addEventListener("click", () => {
            if (carta.dataset.virada === "false") {
                carta.style.backgroundImage = "url('img/partedetras.webp')"; // Imagem da carta virada
                carta.dataset.virada = "true";
            } else {
                carta.style.backgroundImage = `url('img/${carta.dataset.tipo}.webp')`; // Volta para a imagem original
                carta.dataset.virada = "false";
            }
        });

        deck.appendChild(carta);
    });
}

// Função para atualizar o dinheiro
function atualizarDinheiro(valor) {
    dinheiro += valor;
    dinheiroElement.textContent = dinheiro;
}

// Função para reiniciar as cartas
function reiniciarCartas() {
    const cartasGeradas = gerarCartas();
    exibirCartas(cartasGeradas); // Exibe as novas cartas geradas
}

// Função para exibir as cartas para compra
function exibirCartasParaCompra() {
    const comprarSection = document.getElementById("comprar");
    comprarSection.innerHTML = ""; // Limpa a seção de compra antes de adicionar as cartas

    // Cria um título para a seção de compra
    const tituloComprar = document.createElement("h2");
    tituloComprar.textContent = "COMPRAR";
    comprarSection.appendChild(tituloComprar);

    // Exibe as 4 cartas específicas para compra
    tiposCartas.forEach(tipo => {
        let cartaCompra = document.createElement("div");
        cartaCompra.classList.add("lojaCarta");
        cartaCompra.style.backgroundImage = `url('img/${tipo}.webp')`;

        // Adicionando evento para compra de carta
        cartaCompra.addEventListener("click", () => {
            if (dinheiro >= 600) {
                alert(`Carta ${tipo} comprada!`);
                atualizarDinheiro(-600); // Deduz 600 moedas
            } else {
                alert("Você não tem moedas suficientes para comprar esta carta.");
            }
        });

        comprarSection.appendChild(cartaCompra); // Adiciona a carta à seção de compra
    });
}

// Inicializa o jogo com as cartas
const cartasGeradas = gerarCartas();
exibirCartas(cartasGeradas);

// Exibe as cartas para compra
exibirCartasParaCompra();

// Botões de controle
document.getElementById("venceu").addEventListener("click", () => {
    atualizarDinheiro(100); // Jogador ganha 100 moedas
    reiniciarCartas(); // Novas cartas aparecem
});

document.getElementById("perdeu").addEventListener("click", () => {
    atualizarDinheiro(-50); // Jogador perde 50 moedas
    reiniciarCartas(); // Novas cartas aparecem
});
