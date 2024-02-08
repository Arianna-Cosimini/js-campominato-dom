

let userChoice;

const myButton = document.querySelector("#btn-play");
myButton.addEventListener("click", function () {
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

    // Creare e aggiungere gli elementi della griglia al DOM
    for (let i = 0; i < gridSize; i++) {
        newClass(gridElement, randomNumbersArray, i, userChoice);
    }
});

function newClass(gridElement, randomNumbersArray, i, userChoice) {
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

    // Aggiungere un event listener per il clic dell'utente
    newElement.addEventListener("click", function () {
        console.log(this);
        this.classList.toggle("active");
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

function generateRandomNumber(maxNumber) {
    // Generare un numero casuale compreso tra 1 e maxNumber
    return Math.floor(Math.random() * maxNumber) + 1;
}

function getRandomNumbersArray(gridSize) {
    const numbersArray = [];

    // Riempire l'array con numeri casuali unici
    while (numbersArray.length < gridSize) {
        const newNumber = generateRandomNumber(gridSize);
        if (!numbersArray.includes(newNumber)) {
            numbersArray.push(newNumber);
        }
    }

    return numbersArray;
}

