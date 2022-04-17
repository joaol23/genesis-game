var order = [];
var clickedOrder = [];
var score = 0;

// 0 = verde
// 1 = amarelo
// 2 = vermelho
// 3 = azul

const blue = document.querySelector(".blue");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");
const red = document.querySelector(".red");

let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order.push(colorOrder);
    clickedOrder = [];

    for (i in order) {
        let elementColor = createElementByColor(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
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
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            loseGame();
            break;
        }
    }

    if (clickedOrder.length == order.length) {
        alert(`Pontuação = ${score}\nVocê acertou! Iniciando próximo nível...`);
        nextLevel();
    }
}

let click = (color) => {
    clickedOrder.push(color);
    createElementByColor(color).classList.add(`selected`);

    setTimeout(() => {
        createElementByColor(color).classList.remove(`selected`);
        checkOrder();
    }, 250)
}

let createElementByColor = (color) => {
    if (color == 0) {
        return green;
    } else if (color == 1) {
        return yellow;
    } else if (color == 2) {
        return red;
    } else if (color == 3) {
        return blue;
    }
}

let nextLevel = () => {
    score++;
    shuffleOrder();
}

let loseGame = () => {
    alert(`Você perdeu o jogo!`);
    order = [];
    clickedOrder = [];

    playGame();
}

let playGame = () => {
    score = 0;
    alert("Bem vindo ao Genesis! Iniciando novo jogo!");

    nextLevel();
}

green.onclick = () => {
    click(0);
}

blue.onclick = () => {
    click(3);
}

red.onclick = () => {
    click(2);
}

yellow.onclick = () => {
    click(1);
}

playGame();