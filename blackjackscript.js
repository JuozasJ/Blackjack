
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let wasted = false
let message = ''

let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    let cardName = ''
    let cardValue = 0
    if (randomNumber === 1) {
        cardName = 'A'
        cardValue = 11
    } else if (randomNumber === 11) {
        cardName = 'J'
        cardValue = 10
    } else if (randomNumber === 12) {
        cardName = 'Q'
        cardValue = 10
    } else if (randomNumber === 13) {
        cardName = 'K'
        cardValue = 10
    } else {
        cardName = randomNumber
        cardValue = randomNumber
    }
    let card = {
        name: cardName,
        value: cardValue
    }
    return card
}

function startGame() {
    isAlive = true
    hasBlackJack = false
    wasted = false
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard.value + secondCard.value
    renderGame()
}

function renderGame() {
    cardsEl.textContent = 'Cards: '
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i].name + ' '
    }
    if (sum > 21) {
        checkAce()
    }
    sumEl.textContent = 'Sum: ' + sum
    if (sum < 21) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got a Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
        wasted = true
    }
    messageEl.textContent = message
}

function checkAce() {
    for (let i = 0; i < cards.length; i++) {
        if (sum > 21 && cards[i].name === 'A' && cards[i].value === 11) {
            sum -= 10
            cards[i].value = 1
        }
    }
}

function newCard() {
    if (wasted === true || hasBlackJack === true) {
        if (confirm(message + " Start new game?")) {
            startGame()
        }
    } else if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card.value
        cards.push(card)
        renderGame()
    }   
}
