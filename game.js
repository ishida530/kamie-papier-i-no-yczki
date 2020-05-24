const gameSummary = {
    win: 0,
    numbers: 0,
    lose: 0,
    draws: 0,
}
const game = {
    playerHand: "",
    aiHand: "",
}
const hands = [...document.querySelectorAll(".select img")];


function handSelection() {
    game.playerHand = this.dataset.option
    console.log(game.playerHand);
    hands.forEach(hand => hand.style.boxShadow = "");
    this.style.boxShadow = "0 0 0 4px royalblue";
}

hands.forEach(hand => hand.addEventListener("click", handSelection))

function aiChoice() {
    const aiHand = hands[Math.floor(Math.random() * hands.length)].dataset.option;
    console.log(aiHand)
    return aiHand

}

function checkResult(player, ai) {
    if (player === ai) {
        return "draw"

    } else if ((player === "papier" && ai === "kamień") || (player === "kamień" && ai === "nożyczki") || (player === "nożyczki" && ai === "papier")) {
        return "win"
    } else {
        return "lose"
    }
}

function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;
    document.querySelector('p.numbers span').textContent = ++gameSummary.numbers;

    if (result === "win") {
        document.querySelector('p.wins span').textContent = ++gameSummary.win;
        document.querySelector('[data-summary="who-win"]').textContent = "Wygrałes! :)"
        document.querySelector('[data-summary="who-win"]').style.color = "darkgreen"
    }
    if (result === "lose") {
        document.querySelector('p.losses span').textContent = ++gameSummary.lose
        document.querySelector('[data-summary="who-win"]').textContent = "Przegrałeś! :("
        document.querySelector('[data-summary="who-win"]').style.color = "red"

    } else if (result === "draw") {
        document.querySelector('p.draws span').textContent = ++gameSummary.draws;
        document.querySelector('[data-summary="who-win"]').textContent = "Remis!"
        document.querySelector('[data-summary="who-win"]').style.color = "blue"
    }

}

function endGame() {
    document.querySelector('[data-option="' + game.playerHand +
        '"]').style.boxShadow = '';
    game.playerHand = "";
}

function startGame() {
    if (game.playerHand === "") {
        alert("Musisz wybrać dłoń")
        return;
    }
    game.aiHand = aiChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand)
    console.log(gameResult)
    publishResult(game.playerHand, game.aiHand, gameResult);
    endGame();
}

document.querySelector(".start").addEventListener('click', startGame)
