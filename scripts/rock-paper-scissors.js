/*
const score = {
  Wins: 0,
  Losses: 0,
  Ties: 0,
};
*/
const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
//before using parse everything was in string form but it should have to change to obj so to change it into obbj we use json.parse().

updateResult();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);

    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector(".js-auto-play-button").addEventListener("click", () => {
  autoPlay();
});

document.querySelector(".js-reset-button").addEventListener("click", () => {
  (score.wins = 0), (score.losses = 0), (score.ties = 0);
  localStorage.removeItem("score");
  updateResult();
});

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("scissors");
});

function playGame(palyerMove) {
  let computerMove = pickComputerMove();

  let result = "";

  if (palyerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    }
    if (computerMove === "scissors") {
      result = "You win.";
    }
  }

  if (palyerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    }
  } else if (computerMove === "scissors") {
    result = "You lose.";
  }

  if (palyerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "papaer") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  }

  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Ties.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score)); // we change the score to string because localstorage only uses strings.

  updateResult();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-move").innerHTML = `You
  <img src="images/${palyerMove}-emoji.png" alt="" class="move-icon" />
   <img src="images/${computerMove}-emoji.png" alt="" class="move-icon" />`;
}

function updateResult() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties} `;
}

function pickComputerMove() {
  let randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber <= 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber <= 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}
