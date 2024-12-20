// Add these methods to your Cards class
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

const player1newStack = [] 
const player2newStack = []

//put top card of each player's stack and compare
// console.log(player1Stack.shift());


if (player1Stack.shift()['number'] > player2Stack.shift()['number']){
    player1newStack.push(player1Stack.shift());
    player1newStack.push(player2Stack.shift());
    console.log('Player 1 wins');

}else if (player1Stack.shift()['number'] < player2Stack.shift()['number']) {
    player2newStack.push(player1Stack.shift());
    player2newStack.push(player2Stack.shift()); 
    console.log('Player 2 wins');

}else{
    console.log('It is a tie, time to go for War');
    war()
}

function war(){
    // 3 cards face down and 1 card face up and compare the 4th card

    shuffle(player1Stack)
    shuffle(player2Stack)

    // using just 1 card and then who ever wins send the remaining cards

//    refer this : player1Stack.slice(0,3) // 3 cards face down
//    refer this : player2Stack.slice(0,3) // 3 cards face down

    if(player1Stack.shift()['number'] > player2Stack.shift()['number']){
        player1newStack.push(player2Stack.slice(0,3));
        player1newStack.push(player1Stack.slice(0,3));
        player1newStack.push(player2Stack.shift());
        player1newStack.push(player1Stack.shift());
        console.log('Player 1 wins the War');

    }else if(player1Stack.shift()['number'] < player2Stack.shift()['number']){
    player2newStack.push(player1Stack.slice(0,3));
    player2newStack.push(player2Stack.slice(0,3));
    player2newStack.push(player1Stack.shift());
    player2newStack.push(player2Stack.shift());
    console.log('Player 2 refer this :');

    }else{
    console.log('It is a tie, time to go for War');
    war()
    }
}


if (player1Stack.length === 0 ) {
    shuffle(player1newStack);
    player1Stack = player1newStack;
}

if (player2Stack.length === 0 ) {
    shuffle(player2newStack);
    player2Stack = player2newStack;
}












