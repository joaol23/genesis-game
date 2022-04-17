var order = [];
var clickedOrder = [];
var score = 0;

// 0 = verde
// 1 = amarelo
// 2 = vermelho
// 3 = azul

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
            exit();
        }
    })

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
    return document.querySelector(`[data-click="${color}"]`);
}

let nextLevel = () => {
    shuffleOrder();
    score++;
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

playGame();