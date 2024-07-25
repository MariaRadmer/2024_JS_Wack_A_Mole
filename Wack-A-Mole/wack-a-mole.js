/* TODO:
    0. Refactor code
        0.a Make a game object class 
        0.b Make a scene that you have all game obj in
        0.c Make this .js into a rander file
        0.d Make a config file for all the static variables
    1. Add background music
    2. Add Sound on appear and disappearnce
    3. Add Up and down animation
    4. Add more pirana plants
    5. Add a mole that grants more points but is faster
    6. Add a 60 sec timer
    7. Add a 'Try again' button


*/



let boardSize = 9;
let currentMoleTile;
let currentPlantTile;
let spawnMoleRate = 1000; // miliseconds
let spawnPlantRate = 2000; // miliseconds

let score = 0;
let gameOver = false;

window.onload = function () {
    setGame();
}

function setGame() {
    for (let i = 0; i < boardSize; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        document.getElementById("board").appendChild(tile);
        tile.addEventListener("click", selectTile);
        console.log(i);
    }

    setInterval(setMole, spawnMoleRate);
    setInterval(setPlant, spawnPlantRate);
}

function setMole() {
    if (gameOver) {
        return;
    }

    if (currentMoleTile) {
        currentMoleTile.innerHTML = "";
    }

    let moleImage = document.createElement("img");
    moleImage.src = "./Assets/monty-mole.png"

    let randomTile = getRandomTile();
    if (currentPlantTile && currentPlantTile.id == randomTile) {
        return;
    }
    currentMoleTile = document.getElementById(randomTile);

    currentMoleTile.appendChild(moleImage);
}


function setPlant() {
    if (gameOver) {
        return;
    }

    if (currentPlantTile) {
        currentPlantTile.innerHTML = "";
    }

    let plantImage = document.createElement("img");
    plantImage.src = "./Assets/piranha-plant.png"

    let randomTile = getRandomTile();
    if (currentMoleTile && currentMoleTile.id == randomTile) {
        return;
    }
    currentPlantTile = document.getElementById(randomTile);

    currentPlantTile.appendChild(plantImage);
}

function getRandomTile() {
    let number = Math.floor(Math.random() * boardSize);

    return number.toString()
}

function selectTile() {
    if (gameOver) {
        return;
    }

    if (this == currentMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();
    } else if (this == currentPlantTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        gameOver = true
    }
}