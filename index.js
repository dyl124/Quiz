// Array of quiz questions with choices and correct answers
const questions = [
  {
    question: "Commonly used data types in JavaScript don't include?",
    choices: ["numbers", "Boolean", "Cars", "Strings"],
    correctAnswer: "Cars",
  },
  {
    question: "How do you link a JavaScript file to HTML?",
    choices: ["In the title", "In the footer", "In a div", "In the head with defer"],
    correctAnswer: "In the head with defer",
  },
  {
    question: "What can you do with JavaScript?",
    choices: ["Backend", "Frontend", "Call APIs", "All of the above"],
    correctAnswer: "All of the above",
  },
  {
    question: "A variable that will not change should be declared as?",
    choices: ["let", "const", "API", "var"],
    correctAnswer: "const",
  },
  {
    question: "What can you do with JavaScript?",
    choices: ["Backend", "Frontend", "Call APIs", "All of the above"],
    correctAnswer: "All of the above",
  },
];

// Global variables
let currentQuestion = 0;
let score = 0;
let gameEnded = false;
let playerName = "";

// Declare a global variable for interval ID
let intervalId;

// DOM elements
const questionElement = document.getElementById('question');
const answersElements = document.querySelectorAll('.qBtn');
const timerElement = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const initialsInput = document.getElementById('initialsInput');
const submit = document.getElementById('submit');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const scoreList = document.getElementById('scoreList');
const answersBtn = document.getElementsByClassName('qBtn');
let codingTittle = document.getElementById('codingTittle')

// Hide answer buttons initially
for (let i = 0; i < answersBtn.length; i++) {
  answersBtn[i].style.display = 'none';
}

// Event listener for the start button
startBtn.addEventListener("click", startGame);

// Function to get the player's name
function getName() {
  playerName = prompt('Please enter your name');

  if (playerName !== null && playerName.trim() !== "") {
    alert(`Be ready ${playerName}! Click start game when you're ready.`);
  } else {
    alert("Enter a valid name");
    getName(); // Prompt again for a valid name
  }
}

// Call the function to get the player's name
getName();

// Function to display the current question and choices
function printQuestion() {
  if (currentQuestion < questions.length) {
    questionElement.textContent = `Question ${currentQuestion + 1}: ${questions[currentQuestion].question}`;

    answersElements.forEach((element, i) => {
      element.textContent = `Choice ${i + 1}: ${questions[currentQuestion].choices[i]}`;
    });
  } else {
    timerElement.textContent = `Final Score: ${score} out of ${questions.length}`;
    endGame();
  }
}

// Function to start the timer
function startTimer(seconds) {
  let timer = seconds;
  intervalId = setInterval(() => {

    // Check if the game has ended
    if (questionElement.length ===0) {
      clearInterval(intervalId);
      return;
    }

    timerElement.textContent = `${timer}s`;

    if (timer === 0) {
      clearInterval(intervalId);
      timerElement.textContent = "Time's up!";
      currentQuestion = questions.length;
      printQuestion();
    }

    timer--;
  }, 1000);
}

// Event listeners for answer buttons
answersElements.forEach((element) => {
  element.addEventListener("click", (event) => {
    let selectedChoice = event.target.textContent;

    if (currentQuestion < questions.length) {
      if (selectedChoice.includes(questions[currentQuestion].correctAnswer)) {
        score++;
      }

      currentQuestion++;
      printQuestion();
    }
  });
});

// Function to start the game
function startGame() {
  // Show answer buttons
  codingTittle.textContent = " Coding Quiz:";
  for (let i = 0; i < answersBtn.length; i++) {
    answersBtn[i].style.display = 'block';
  }

  // Initialize game variables
  currentQuestion = 0;
  score = 0;
  gameEnded = false;

  // Start the timer and print the first question
  startTimer(60);
  printQuestion();
}

// Function to end the game
function endGame() {
  codingTittle.textContent = "Quiz completed!";
  clearInterval(intervalId);
  timerElement.textContent = `Final Score: ${score} out of ${questions.length}`;
  questionElement.style.display = "none";

  for (let i = 0; i < answersBtn.length; i++) {
    answersBtn[i].style.display = 'none';
  }
  startBtn.style.display = "block";
  startBtn.disabled = false;

  // Save the player's score and name to local storage
  saveScore(playerName, score);

  // Show high scores modal
  showHighScores();
}


// Function to show the modal with highest scores
function showHighScores() {
  modal.style.display = 'block';
  overlay.style.display = 'block';

  // Retrieve scores from local storage
  let savedScores = JSON.parse(localStorage.getItem('highScores')) || [];

  // Sort scores in descending order
  let sortedScores = savedScores.sort((a, b) => b.score - a.score);

  // Display scores in the modal
  scoreList.innerHTML = sortedScores.map(score => `<li>${score.name}: ${score.score}</li>`).join('');
}

// Function to close the modal
function closeModal() {
  modal.style.display = 'none';
  overlay.style.display = 'none';
}

// Function to save the player's score to local storage
function saveScore(name, score) {
  let savedScores = JSON.parse(localStorage.getItem('highScores')) || [];
  savedScores.push({ name, score });

  // Save scores back to local storage
  localStorage.setItem('highScores', JSON.stringify(savedScores));
}
