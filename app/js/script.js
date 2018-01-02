//Create an array of tiles/data to match
const numberOfPairs = 5;
const pairData = [];
const container = document.querySelector('.container');
const delayBeforeTurnBack = 1500;
let output = '';
let currentCard = '';
let currentCardId = '';
let firstCardSelected = '';
let firstCardSelectedId = '';

for (let i = 0; i < numberOfPairs; i++) {
    pairData.push(i, i);
}

//Generate an HTML output string and send to the container
pairData.forEach((item) => {
    output += `<span class="card" data-card-id=${item}>${item}</span>`;
});
container.innerHTML = output;

//Set listeners on all cards
const cards = document.querySelectorAll('.card');
cards.forEach(card => card.addEventListener("click", handleCardSelected));

function handleCardSelected(e) {
    currentCard = e.path[0];
    currentCardId = currentCard.dataset.cardId;
    currentCard.classList.add('face-up'); //Add face-up class to reveal card
    if (firstCardSelectedId === '') {
        firstCardSelectedId = currentCardId;
        firstCardSelected = currentCard;
    } else {
        checkIfMatch();
    }
}

function checkIfMatch() {
    if (firstCardSelectedId === currentCardId) {
        //Match!
        console.log(`Match! ${currentCardId} ${firstCardSelectedId}`);
        currentCard.classList.add('matched');
        firstCardSelected.classList.add('matched');
        turnCardsBack();
    } else {
        //not a match
        console.log(`Not a match! ${currentCardId} ${firstCardSelectedId}`);
        setTimeout(() => { turnCardsBack() }, delayBeforeTurnBack); //Delay before turning cards back over
    }
    firstCardSelectedId = '';
}

function turnCardsBack() {
    //Turn back cards which have the face-up class and not the matched class
    let currentlyTurnedOverCards = document.querySelectorAll('.face-up');
    currentlyTurnedOverCards.forEach(card => {
        if (!card.classList.contains('matched')) {
            card.classList.remove('face-up');
        }
    });
}