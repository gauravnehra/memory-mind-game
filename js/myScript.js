const cardImages = ["angler-fish.png", "diamonds-smile.png", "missile-swarm.png", 
                    "rogue.png", "ship-wheel.png", "sword-spade.png", "triton-head.png", 
                    "unlit-bomb.png", "angler-fish.png", "diamonds-smile.png", 
                    "missile-swarm.png", "rogue.png", "ship-wheel.png", "sword-spade.png", 
                    "triton-head.png", "unlit-bomb.png"]
;
let cardElements = document.getElementsByClassName("card");
let moves = document.getElementById("moves");
let openedCards = [];
let matchedCards = [];
let moveCount = 0;
let matchedCardCount = 0;

let btn = document.getElementById("btn");
btn.addEventListener("click", start);

function start(e) {
    let eventTarget = e.target;
    if(eventTarget.className == "play-btn") {
        eventTarget.className = "reset-btn";
        shuffle();
        setTimeout(hideAll, 800);
        showAll();
        enableAllCards();
    }
    else if(eventTarget.className == "reset-btn") {
        resetGame();
        eventTarget.className = "play-btn";
    }
}

// to show card on click
function openCard(e) {
    e.target.removeEventListener("click", openCard);
    ++moveCount;    // number of moves made
    moves.innerText = moveCount;
    let id = e.target.id;
    e.target.src = "images/" + cardImages[id-1];
    openedCards.push(e.target);
    if(openedCards.length >= 2) {
        disableAllCards();
        setTimeout(check, 1500);
    }
}

// to check condition
function check() {
    if(openedCards.length == 2 && openedCards[0].src != openedCards[1].src) {
        hideCard();
    }
    else if(openedCards.length == 2 && openedCards[0].src == openedCards[1].src) {
        disableCard();
    }
    else if(openedCards.length > 2) {
        for(let i = 0; i < openedCards.length; i++) {
            openedCards.pop();
        }
    }
}

// to hide opened cards
function hideCard(e) {
    let card = document.getElementById(openedCards[0].id);
    card.src = "images/blank.png";
    card = document.getElementById(openedCards[1].id);
    card.src = "images/blank.png";
    openedCards.pop();
    openedCards.pop();
    enableAllCards();
}

// disable card after it's matched
function disableCard() {
    for(let i = 0; i < openedCards.length; i++) {
        let card = document.getElementById(openedCards[i].id);
        card.removeEventListener("click", openCard);
        matchedCards.push(openedCards[i]);
    }
    openedCards.pop();
    openedCards.pop();
    ++matchedCardCount;     // number of matches
    if(matchedCardCount == 8 && matchedCards.length == 16) {
        won();
    }
    enableAllCards();
}

// disable all cards
function disableAllCards() {
    for(let i = 0; i < cardElements.length; i++) {
        cardElements[i].removeEventListener("click", openCard);
    }
}

// enable all cards
function enableAllCards() {
    for(let i = 0; i < cardElements.length; i++) {
        let flag = matchedCards.includes(cardElements[i]);
        if(flag == false) {
            cardElements[i].addEventListener("click", openCard);
        }
    }
}

// to show all cards
function showAll() {
    for(let i = 0; i < cardElements.length; i++) {
        cardElements[i].src = "images/" + cardImages[i];
    }
}

// to hide all cards
function hideAll() {
    for(let i = 0; i < cardElements.length; i++) {
        cardElements[i].src = "images/blank.png";
    }
}

// Fisher-Yates Shuffle
function shuffle() {
    for(let i = cardImages.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random()*(i+1));
        [cardImages[i], cardImages[j]] = [cardImages[j], cardImages[i]];
    }
}

// reset the game
function resetGame() {
    disableAllCards();
    shuffle();
    setTimeout(hideAll, 800);
    showAll();
    moveCount = 0;
    matchedCardCount = 0;
    moves.innerText = moveCount;
    matchedCards = [];
    openedCards = [];
}

// calculate final score
function calcScore() {
    return (matchedCardCount/moveCount)*200;
}

function won() {
    let modal = document.getElementById("win-modal");
    let close = document.getElementById("close");
    let reset = document.getElementById("reset-modal");
    
    let score = calcScore();
    document.getElementById("final-moves").innerText = moveCount;
    document.getElementById("final-score").innerText = score.toPrecision(2);

    // show modal
    modal.style.display = "block";
    // to reset game
    reset.onclick = function() {
        modal.style.display = "none";
        resetGame();
    }
    // to close modal if user clicks on close
    close.onclick = function() {
        modal.style.display = "none";
    }
    // to close modal if user clickks outside modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    } 
}