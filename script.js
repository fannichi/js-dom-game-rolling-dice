'use strict';

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

const name0 = document.querySelector('#name--0');
const name1 = document.querySelector('#name--1');

const diceImage = document.querySelector('.dice');

const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');

const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

// Starting conditions
const WINNING_SCORE = 10; // Set winning score as a constant for easy customization
let playing, currentScore, activePlayer, scores;

function initGame() {
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  diceImage.classList.add('hidden');

  // Reset player classes
  player1.classList.remove('player--winner', 'player--active');
  player2.classList.remove('player--winner', 'player--active');
  player1.classList.add('player--active');

  // Reset player names
  name0.textContent = 'Player 1';
  name1.textContent = 'Player 2';
}

// Switching active player
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
}

// Event listener for rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Activate the dice animation
    diceImage.classList.remove('animate');
    void diceImage.offsetWidth; // Trigger reflow to restart animation
    diceImage.classList.add('animate');

    // Generate a dice number
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display the dice
    diceImage.classList.remove('hidden');
    diceImage.src = `dice-${dice}.png`;

    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

// Event listener for holding the score
btnHold.addEventListener('click', function () {
  if (playing) {
    // Update total score for active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= WINNING_SCORE) {
      // Finish the game if winning score is reached
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector(`#name--${activePlayer}`).textContent = 'Winner!';
      diceImage.classList.add('hidden');
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

// New game button
btnNew.addEventListener('click', initGame);

// Initialize game on page load
initGame();
