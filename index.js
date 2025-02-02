const tiposCartas = ["morte", "facas", "sol", "lua"];
const deck = document.getElementById("deck");
const dinheiroElement = document.getElementById("dinheiro");
let dinheiro = 100; // Dinheiro inicial do jogador
let cartasNoDeck = []; // Array para armazenar as cartas no deck

// Função para gerar 8 cartas aleatórias
function gerarCartas() {
    let cartas = [];
    for (let i = 0; i < 8; i++) {
        let tipoAleatorio = tiposCartas[Math.floor(Math.random() * tiposCartas.length)];
        cartas.push(tipoAleatorio);
    }
    return cartas;
}

// Renderiza as cartas no deck
function exibirDeck() {
    deck.innerHTML = ""; // Limpa o deck para exibir as novas cartas
    cartasNoDeck.forEach((tipo, index) => {
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
        tocarSomVirar(); // Toca o som de virar
    } else {
        carta.style.backgroundImage = `url('img/${carta.dataset.tipo}.webp')`; // Volta para a imagem original
        carta.dataset.virada = "false";
        tocarSomVirar(); // Toca o som de desvirar
    }
});
// Função para tocar o som de virar/desvirar a carta
function tocarSomVirar() {
    const somVirar = document.getElementById("somVirar");
    somVirar.play();
}

        // Criando o "X" para remover a carta
        const removeButton = document.createElement("span");
        removeButton.textContent = "X";
        removeButton.classList.add("remove-btn");
        removeButton.addEventListener("click", (event) => {
            event.stopPropagation(); // Impede o clique de propagar e virar a carta
            removerCarta(carta, index); // Passa o índice para remover a carta corretamente
        });

        carta.appendChild(removeButton); // Adiciona o "X" à carta
        deck.appendChild(carta);
    });
}

// Função para atualizar o dinheiro
function atualizarDinheiro(valor) {
    dinheiro += valor;
    dinheiroElement.textContent = "Dinheiro: " + dinheiro;
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
                cartasNoDeck.push(tipo); // Adiciona a carta ao deck
                exibirDeck(); // Atualiza o deck de cartas exibido
            } else {
                alert("Você não tem moedas suficientes para comprar esta carta.");
            }
        });

        comprarSection.appendChild(cartaCompra); // Adiciona a carta à seção de compra
    });
}

// Inicializa o jogo com as cartas
const cartasGeradas = gerarCartas();
cartasNoDeck = cartasGeradas; // Coloca as 8 cartas iniciais no deck
exibirDeck(); // Exibe as cartas no deck

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

// Função para reiniciar as cartas
function reiniciarCartas() {
    const novasCartas = gerarCartas(); // Gera novas cartas
    cartasNoDeck = novasCartas; // Atualiza o deck com as novas cartas
    exibirDeck(); // Exibe o novo deck de cartas
}

// Verifica se o deck ficou vazio e reinicia as cartas
if (cartasNoDeck.length === 0) {
    reiniciarCartas(); // Reinicia as cartas caso o deck esteja vazio
}

// Função para tocar o som de remover a carta
function tocarSomRemover() {
    const somX = document.getElementById("somX");
    if (somX) {
        somX.play().catch(error => {
            console.error("Erro ao tentar tocar o som:", error);
        });
    } else {
        console.error("Elemento de áudio não encontrado.");
    }
}

// Função para remover a carta e adicionar moedas
function removerCarta(carta, index) {
    // Adiciona 25 moedas ao jogador
    atualizarDinheiro(25);

    // Remove a carta do deck
    cartasNoDeck.splice(index, 1); // Remove a carta do array
    exibirDeck(); // Atualiza o deck exibido após a remoção

    // Toca o som de remoção da carta
    tocarSomRemover();
}


// Função para tocar o som de vitória (GG)
function tocarSomGg() {
    const somGg = document.getElementById("somGg");
    somGg.play();
}

// Função para tocar o som de derrota
function tocarSomPerdeu() {
    const somPerdeu = document.getElementById("somPerdeu");
    somPerdeu.play();
}

// Adiciona eventos para os botões "Venceu" e "Perdeu"
document.getElementById("venceu").addEventListener("click", () => {
    atualizarDinheiro(100); // Jogador ganha 100 moedas
    reiniciarCartas(); // Novas cartas aparecem
    tocarSomGg(); // Toca o som de vitória
});

document.getElementById("perdeu").addEventListener("click", () => {
    atualizarDinheiro(-50); // Jogador perde 50 moedas
    reiniciarCartas(); // Novas cartas aparecem
    tocarSomPerdeu(); // Toca o som de derrota
});

