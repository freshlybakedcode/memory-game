const numberOfPairs = 5;
let pairData = [];
const container = document.querySelector('.container');
const modal = document.querySelector('.modal');
const delayBeforeTurnBack = 1100;
let clickEnabled = true;
let output = '';
let modalOutput = '';
let currentCard = '';
let currentCardId = '';
let firstCardSelected = '';
let firstCardSelectedId = '';

function setUpGameBoard() {
    //Set up the board ready to play
    pairData = shuffle(pairData);

    //Generate an HTML output string and send to the container
    pairData.forEach((item) => {
        output += ` <span class="card" data-card-id=${item}>
                        <span class="card-front"></span>
                        <span class="card-back">${item}</span>
                    </span>`;
    });
    container.innerHTML = output;
}

function setListeners() {
    //Set listeners on all cards and the 'play again' button
    const cards = document.querySelectorAll('.card-front');
    cards.forEach(card => card.addEventListener("click", handleCardSelected));
}

function shuffle(array) {
    //Shuffle up those cards
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there are remaining elements to shuffle...
    while (0 !== currentIndex) {

        // ...pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // ...and swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function handleCardSelected(e) {
    if (clickEnabled) {
        currentCard = e.path[1];
        currentCardId = currentCard.dataset.cardId;
        if (!currentCard.classList.contains('face-up')) { //Prevent user choosing same card twice
            currentCard.classList.add('face-up'); //Add face-up class to reveal card
            if (firstCardSelectedId === '') {
                firstCardSelectedId = currentCardId;
                firstCardSelected = currentCard;
            } else {
                checkIfMatch();
            }
        }
    }
}

function checkIfMatch() {
    if (firstCardSelectedId === currentCardId) {
        //Match!
        console.log(`Match! ${currentCardId} ${firstCardSelectedId}`);
        currentCard.classList.add('matched');
        firstCardSelected.classList.add('matched');
        testForCompletion();
    } else {
        //not a match
        console.log(`Not a match! ${currentCardId} ${firstCardSelectedId}`);
        clickEnabled = false; //Stop user turning over any other cards
        setTimeout(() => {
            turnCardsBack()
            clickEnabled = true;
        }, delayBeforeTurnBack); //Delay before turning cards back over
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

function testForCompletion() {
    //Has the user matched all pairs?
    let currentlyMatchedCards = document.querySelectorAll('.matched');
    if (currentlyMatchedCards.length === numberOfPairs * 2) {
        console.log('All pairs matched!');
        modal.style.display = 'block';
    }
}

function handlePlayAgain() {
    modal.style.display = 'none';
    output = '';
    modalOutput = '';
    setUpGameBoard();
    setListeners();
}

function firstTimeRun() {
    //Create an array of tiles/data to match
    for (let i = 0; i < numberOfPairs; i++) {
        pairData.push(i, i);
    }
    //Generate the modal window content and set listener
    modalOutput += `<h1>Yay!</h1>
                    <h2>You matched all the pairs!</h2>
                    <span class="modal-button">Play again</span>`
    modal.innerHTML = modalOutput;
    const modalButton = document.querySelector('.modal-button');
    modalButton.addEventListener("click", handlePlayAgain);
}

firstTimeRun();
setUpGameBoard();
setListeners();