

let userChoice;
let score = 0;
let gameOver = false;

const myButton = document.querySelector("#btn-play");
myButton.addEventListener("click", function () {

    gameOver = false;

    // Ottenere il valore della scelta dell'utente
    userChoice = document.querySelector("select").value;

    // Ottenere l'elemento della griglia
    const gridElement = document.querySelector("#grid");

    // Azzerare il contenuto della griglia
    gridElement.innerHTML = '';

    // Ottenere la dimensione della griglia in base alla scelta dell'utente
    const gridSize = getGridSize(userChoice);

    // Generare un array di numeri casuali per riempire la griglia
    const randomNumbersArray = getRandomNumbersArray(gridSize);

    // Array con le posizioni delle bombe
    const bombPositions = generateBombPositions(gridSize, 16);
    // resetto il puteggio
    score = 0;

    // Creare e aggiungere gli elementi della griglia al DOM
    for (let i = 0; i < gridSize; i++) {
        newClass(gridElement, randomNumbersArray, i, userChoice, bombPositions, gridSize);
    }


});

function newClass(gridElement, randomNumbersArray, i, userChoice, bombPositions, gridSize) {
    const newElement = document.createElement("div");
    newElement.classList.add("square");
    newElement.innerText = randomNumbersArray[i];

    // Aggiungere la classe appropriata in base alla scelta dell'utente
    if (userChoice == 1) {
        newElement.classList.add("hard");
    } else if (userChoice == 2) {
        newElement.classList.add("medium");
    } else {
        newElement.classList.add("easy");
    }



    newElement.addEventListener("click", function removeClick() {

        if (gameOver) {
            alert("Il gioco è già finito. Inizia una nuova partita.");
            return; 
        }


        function revealMines(gridElement, bombPositions) {
            bombPositions.forEach(position => {
                const bombElement = gridElement.children[position];
                bombElement.innerText = "💣";
                bombElement.classList.add("bomb");
            });
        }

        // controllo se la cella corrente è una mina
        if (bombPositions.includes(i)) {
            revealMines(gridElement, bombPositions);
            alert("Partita terminata. Hai perso! Punteggio:" + score);
           
            gameOver = true; 
        } else {

            score++

        } if (score === gridSize - bombPositions.length) {
            console.log("Hai vinto! punteggio:" + score);
            alert("Hai vinto!");
            gameOver = true;
        }

        console.log(this.innerText);
        this.classList.add("active");
        this.removeEventListener("click", removeClick);
    });

    // Aggiungere l'elemento alla griglia

    gridElement.append(newElement);
}

function getGridSize(userChoice) {
    // Restituire la dimensione della griglia in base alla scelta dell'utente
    if (userChoice == 1) {
        return 49;
    } else if (userChoice == 2) {
        return 81;
    } else {
        return 100;
    }
}

function getRandomNumbersArray(gridSize) {
    const numbersArray = [];

    // Riempire l'array con numeri casuali
    while (numbersArray.length < gridSize) {
        const newNumber = generateRandomNumber(gridSize);
        if (!numbersArray.includes(newNumber)) {
            numbersArray.push(newNumber);
        }
    }

    return numbersArray;
}


function generateBombPositions(gridSize, numBombs) {
    const bombPositions = [];
    while (bombPositions.length < numBombs) {
        const position = generateRandomBombPosition(gridSize);
        if (!bombPositions.includes(position)) {
            bombPositions.push(position);
        }
    }
    return bombPositions;
}

function generateRandomBombPosition(gridSize) {
    return Math.floor(Math.random() * gridSize);
}

// Funzione per generare un numero casuale compreso tra 1 e maxNumber
function generateRandomNumber(maxNumber) {
    return Math.floor(Math.random() * maxNumber) + 1;
}
// posizioni delle bombe livello easy
const gridEasy = 100;
const numbersEasy = 16;
const bombPositionsLevelEasy = generateBombPositions(gridEasy, numbersEasy);
console.log("Bombe per livello easy:", bombPositionsLevelEasy);

// posizioni delle bombe livello medium
const gridMedium = 81;
const numbersMedium = 16;
const bombPositionsLevelMedium = generateBombPositions(gridMedium, numbersMedium);
console.log("Bombe per livello medium:", bombPositionsLevelMedium);

//posizioni delle bombe livello hard
const gridHard = 49;
const numbersHard = 16;
const bombPositionsLevelHard = generateBombPositions(gridHard, numbersHard);
console.log("Bombe per livello hard:", bombPositionsLevelHard);







