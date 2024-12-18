class Cards{
    constructor(number,suit){
        this.number = number;
        this.suit = suit;
    }
}


//hold 52 cards
class Deck{
    constructor(cards){
        this.cards = [];
    }
}

const deck = new Deck()


//create 4 suits : 13 cards and push to deck
//clubs
let clubs = [];
for (let i = 1; i <= 13; i++) {
       clubs.push(new Cards(i, 'Clubs')); 
    
}
//diamonds
let diamonds = [];
for (let i = 1; i <= 13; i++) {
       clubs.push(new Cards(i, 'Diamonds')); 
    
}
//hearts
let hearts = [];
for (let i = 1; i <= 13; i++) {
       clubs.push(new Cards(i, 'Hearts')); 
    
}
//spades
let spades = [];
for (let i = 1; i <= 13; i++) {
       clubs.push(new Cards(i, 'Spades')); 
    
}
// use ...spread operator to push to deck

deck.cards = [...clubs,...diamonds,...hearts,...spades];

// shuffle the cards and give both players 26 cards each : 52/2 = 26 , which are random all of them 26 cards.
// how do i randomly sort an array

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


const player1Stack = deck.cards.slice(0, 26);
const player2Stack = deck.cards.slice(26,52);

const player1newStack = [] 
const player2newStack = []








