// Global state variables
let currentPlayer;
let cardp1 = null;
let cardp2 = null;
let player1newStack = [];
let player2newStack = [];

const player1Draw = document.querySelector('#player1-draw');
const player2Draw = document.querySelector('#player2-draw');
const warAlert = document.querySelector('#war-alert');

player1Draw.addEventListener('click', () => {
    currentPlayer = 1;
    multiPlayerDraw();
});

player2Draw.addEventListener('click', () => {
    currentPlayer = 2;
    multiPlayerDraw();
});

function initializeMultiPlayerGame() {
        // Reset game state
        player1Stack = [];
        player2Stack = [];
        player1newStack = [];
        player2newStack = [];
        cardp1 = null;
        cardp2 = null;
        
        // Create and shuffle new deck
        const deck = new Deck();
        deck.shuffle();
        
        // Split deck between players
        const halfDeck = Math.floor(deck.cards.length / 2);
        player1Stack = deck.cards.slice(0, halfDeck);
        player2Stack = deck.cards.slice(halfDeck);
        
        // Reset UI elements
        document.getElementById('player1-card').innerHTML = '';
        document.getElementById('player2-card').innerHTML = '';
        document.getElementById('war-alert').style.display = 'none';
        
        // Update card counts
        updateCardCounts();
        
        // Set initial game status
        showGameStatus('Game started! Players draw your cards!');
        
        // Enable draw buttons
        document.getElementById('player1-draw').disabled = false;
        document.getElementById('player2-draw').disabled = false;
        
        currentPlayer = 1; // Start with Player 1
}

function compareCards() {
    if (cardp1.number > cardp2.number) {
        player1newStack.push(cardp1, cardp2);
        showGameStatus('Player 1 wins the round!');
    } else if (cardp1.number < cardp2.number) {
        player2newStack.push(cardp1, cardp2);
        showGameStatus('Player 2 wins the round!');
    } else {
        setTimeout(() => {
            warAlert.style.display = 'block';
        }, 400);
        war();
    }

    // Reset cards
    cardp1 = null;
    cardp2 = null;
    
    // Update counts after comparison
    updateCardCounts();
}

 function multiPlayerDraw() {
    const currentStack = currentPlayer === 1 ? player1Stack : player2Stack;
    
    if (currentStack.length === 0) {
        document.getElementById('mp-game-status').textContent = 
            `Player ${currentPlayer} has no cards left!`;
        return;
    }

    const card = currentStack.shift();
    
    // Store card for comparison
    if (currentPlayer === 1) {
        cardp1 = card;
    } else {
        cardp2 = card;
    }

    // Display card
    const cardElement = document.getElementById(`player${currentPlayer}-card`);
    if (cardElement && card) {
        cardElement.innerHTML = `
            <div class="card-face card-back"></div>
            <div class="card-face card-front">
                <span class="card-value ${card.suit === 'Hearts' || card.suit === 'Diamonds' ? 'red' : 'black'}">
                    ${card.number}
                </span>
                <span class="card-suit ${card.suit === 'Hearts' || card.suit === 'Diamonds' ? 'red' : 'black'}">
                    ${card.suit}
                </span>
            </div>
        `;

         // Flip animation
         cardElement.classList.add('flipped');
}

// Compare cards if both players have drawn
if (cardp1 && cardp2) {
    setTimeout(compareCards, 1500);
}

showGameStatus(`Player ${currentPlayer} drew a card!`);
updateCardCounts();
}


function updateCardCounts() {
    const player1Total = player1Stack.length + player1newStack.length;
    const player2Total = player2Stack.length + player2newStack.length;
    
    document.getElementById('player1-count').textContent = `Player 1 Cards: ${player1Total}`;
    document.getElementById('player2-count').textContent = `Player 2 Cards: ${player2Total}`;
}

function showGameStatus(message) {
    const status = document.getElementById('mp-game-status');
    status.textContent = message;
    setTimeout(() => {
        status.textContent = '';
    }, 700);
}
