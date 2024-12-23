// Add event listener for rules navigation
document.getElementById('rules').addEventListener('click', (e) => {
    e.preventDefault();
    const rulesSection = document.querySelector('.rules');
    rulesSection.scrollIntoView({ behavior: 'smooth' });
});

// Back to game link functionality
document.querySelector('.rules a').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// Start single player game
function startSinglePlayer(e) {
    e.preventDefault(); // Prevent default link behavior
    document.getElementById('single-player').style.display = 'block';
    document.getElementById('multi-player').style.display = 'none';
    currentGameMode = 'single';
    document.querySelector('.firstVisual').style.display = 'none';
    // initializeSinglePlayerGame();
}

// Start multiplayer game
function startMultiPlayer(e) {
    e.preventDefault(); // Prevent default link behavior
    document.getElementById('multi-player').style.display = 'block';
    document.getElementById('single-player').style.display = 'none';
    currentGameMode = 'multi';
    document.querySelector('.firstVisual').style.display = 'none';
    initializeMultiPlayerGame();
}

const singleplayerBtn = document.getElementById('singleplayer');
const multiplayerBtn = document.getElementById('multiplayer');
singleplayerBtn.addEventListener('click', startSinglePlayer);
multiplayerBtn.addEventListener('click', startMultiPlayer);




       
class Cards {
    constructor(number, suit) {
        this.number = number;
        this.suit = suit;
        this.element = this.createCardElement();
    }

    getSuitSymbol() {
        const symbols = {
            'Hearts': '♥',
            'Diamonds': '♦',
            'Clubs': '♣',
            'Spades': '♠'
        };
        return symbols[this.suit];
    }

    getDisplayNumber() {
        const special = {
            1: 'A',
            11: 'J',
            12: 'Q',
            13: 'K'
        };
        return special[this.number] || this.number;
    }

    createCardElement() {
        const card = document.createElement('div');
        card.className = 'card';
        
        const value = document.createElement('div');
        value.className = 'card-value';
        value.textContent = this.getDisplayNumber();
        
        const suit = document.createElement('div');
        suit.className = 'card-suit';
        suit.textContent = this.getSuitSymbol();
        
        if (this.suit === 'Hearts' || this.suit === 'Diamonds') {
            value.style.color = 'red';
            suit.style.color = 'red';
        }
        
        card.appendChild(value);
        card.appendChild(suit);
        return card;
    }
}




//hold 52 cards
class Deck{
    constructor(){
        this.cards = [];
    }
}

const deck = new Deck()


//create 4 suits : 13 cards and push to deck
//clubs
const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
suits.forEach(suit => {
    for (let i = 1; i <= 13; i++) {
        deck.cards.push(new Cards(i, suit));
    }
});


// shuffle the cards and give both players 26 cards each : 52/2 = 26 , which are random all of them 26 cards.
// how do i randomly sort an array

//Fisher–Yates Shuffle
function shuffle(array){
    let currentIndex = array.length; //52

    while (currentIndex != 0){
        //pick a remaining element
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        //swap the last element with the random index
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

}


shuffle(deck.cards);
//now deck is shuffled 

//give both players 26 cards each : 52/2 = 26



const player1Stack = deck.cards.slice(0, 26); //array of 26 cards each -> deck of 26 cards
const player2Stack = deck.cards.slice(26,52); //array of 26 cards each -> deck of 26 cards



function war() {
    // Check if players have enough cards for war
    if (player1Stack.length < 4 || player2Stack.length < 4) {
        handleInsufficientCards();
        return;
    }

    // Draw face down cards (3 each)
    const player1WarCards = player1Stack.splice(0, 3);
    const player2WarCards = player2Stack.splice(0, 3);
    
    // Draw face up cards for war
    const player1WarCard = player1Stack.shift();
    const player2WarCard = player2Stack.shift();

    if (!player1WarCard || !player2WarCard) {
        handleInsufficientCards();
        return;
    }

    // Compare war cards
    if (player1WarCard.number > player2WarCard.number) {
        // Player 1 wins war
        player1newStack.push(...player1WarCards, ...player2WarCards);
        player1newStack.push(player1WarCard, player2WarCard);
        showGameStatus('Player 1 wins the War!');
    } 
    else if (player1WarCard.number < player2WarCard.number) {
        // Player 2 wins war
        player2newStack.push(...player1WarCards, ...player2WarCards);
        player2newStack.push(player1WarCard, player2WarCard);
        showGameStatus('Player 2 wins the War!');
    } 
    else {
        // Another tie - recursive war
        showGameStatus('Another War!');
        // Return cards to stacks for next war
        player1Stack.unshift(player1WarCard, ...player1WarCards);
        player2Stack.unshift(player2WarCard, ...player2WarCards);
        war();
    }

    updateCardCounts();
}

function handleInsufficientCards() {
    if (player1Stack.length < 4) {
        player2newStack.push(...player1Stack);
        player1Stack = [];
        showGameStatus('Player 1 doesn\'t have enough cards. Player 2 wins!');
    } else {
        player1newStack.push(...player2Stack);
        player2Stack = [];
        showGameStatus('Player 2 doesn\'t have enough cards. Player 1 wins!');
    }
    updateCardCounts();
}




       












