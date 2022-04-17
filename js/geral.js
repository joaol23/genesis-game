var order = [];
var clickedOrder = [];
var score = 0;

// 0 = verde
// 1 = amarelo
// 2 = vermelho
// 3 = azul
const startGameButton = document.querySelector(`.start-game`);
const container = document.querySelector(`.container`);

startGameButton.onclick = () => {
    container.style.display = 'none';
    playGame();
}

//sons
const soundClick = document.querySelector(`#sound-click`);
const soundLose = document.querySelector(`#sound-lose`);
soundClick.volume = 0.2;

const colors = document.querySelectorAll(`[data-click]`);

colors.forEach((value) => {
    value.onclick = () => {
        let color = value.getAttribute(`data-click`);

        click(color);
    }
})

let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order.push(colorOrder);
    clickedOrder = [];

    order.forEach((value, i) => {
        let elementColor = createElementByColor(value);
        lightColor(elementColor, Number(i) + 1);
    })
}

let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add("selected");
    }, number - 250);

    setTimeout(() => {
        element.classList.remove("selected");
    }, number - 100);
}

let checkOrder = () => {
    clickedOrder.forEach((value, i) => {
        if (value != order[i]) {
            loseGame();
            return;
        }
    })

    if (clickedOrder.length == order.length) {
        alert(`Pontuação = ${score}\nVocê acertou! Iniciando próximo nível...`);
        nextLevel();
    }
}

let click = (color) => {
    soundClick.play();
    clickedOrder.push(color);
    createElementByColor(color).classList.add(`selected`);
    setTimeout(() => {
        createElementByColor(color).classList.remove(`selected`);
        checkOrder();
    }, 250)
}

let createElementByColor = (color) => {
    return document.querySelector(`[data-click="${color}"]`);
}

let nextLevel = () => {
    shuffleOrder();
    score++;
}

let loseGame = () => {
    soundLose.play();
    alert(`Você perdeu o jogo!`);
    order = [];
    clickedOrder = [];

    container.style.display = 'block';
}

let playGame = () => {
    score = 0;
    // alert("Bem vindo ao Genesis! Iniciando novo jogo!");

    nextLevel();
}