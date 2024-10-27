"use strict";

// Import quiz questions and the validateName function
import { quizQuestions, validateName } from "./functions.js";

// Select HTML elements
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("result");
const startBtn = document.getElementById("start-btn");
const submitButton = document.getElementById("submit-btn");
const retryButton = document.getElementById("retry-btn");
const showAnswerButton = document.getElementById("showAnswer-btn");

// Track the quiz state
let isClicked = false;
let currentQuestion = 0;
let score = 0;
let incorrectAnswer = [];

// Load player names from local storage
const names = JSON.parse(localStorage.getItem("player")) || [];

// Class to handle local storage operations
class Db {
  static saveToStorage(storageName, storageData) {
    localStorage.setItem(storageName, JSON.stringify(storageData));
  }

  static loadFromStorage(storageName) {
    return JSON.parse(localStorage.getItem(storageName)) || [];
  }
}

// Shuffle an array
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function startButton() {
  startBtn.addEventListener("click", () => {
    let name = prompt("Please enter your name:");
    let valid = validateName(name);
    while (name === undefined || name.trim() === "" || !valid) {
      alert("Please enter a valid name!");
      name = prompt("Please enter your name:");
      valid = validateName(name);
      return;
    }
    alert(`Good Luck, ${name}`);
    displayQuestions();
    names.push(name);
    Db.saveToStorage("player", names);
  })
  
}

startButton();
// Display the current question and options
function displayQuestions() {
  startBtn.style.display = "none";
  const question = quizQuestions[currentQuestion];
  const questionElement = document.createElement("div");
  questionElement.className = "question";
  questionElement.innerHTML = `<p>${question.question}</p>`;

  const optionsElement = document.createElement("div");
  optionsElement.className = "options";

  const shuffledOptions = [...question.options];
  shuffleArray(shuffledOptions);

  shuffledOptions.forEach((optionText) => {
    const option = document.createElement("label");
    option.className = "option";

    const radio = document.createElement("input");
    radio.className = "radio";
    radio.type = "radio";
    radio.name = "quiz";
    radio.value = optionText;

    option.appendChild(radio);
    option.appendChild(document.createTextNode(optionText));
    optionsElement.appendChild(option);
  });

  quizContainer.innerHTML = ""; // Clear previous question
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

// Check the user's selected answer and update the score
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (!selectedOption) {
    alert("Please select an answer.");
    return;
  }

  const userAnswer = selectedOption.value;
  const question = quizQuestions[currentQuestion];

  if (userAnswer === question.answer) {
    score++;
  } else {
    incorrectAnswer.push({
      question: question.question,
      userAnswer: userAnswer,
      correctAnswer: question.answer,
    });
  }

  currentQuestion++;
  if (currentQuestion < quizQuestions.length) {
    displayQuestions();
  } else {
    showResults();
  }
}

// Display the results of the quiz
function showResults() {
  resultsContainer.innerHTML = `You scored ${score} out of ${quizQuestions.length}.`;
  retryButton.style.visibility = "visible";
  showAnswerButton.style.display = "block";
}

// Retry the quiz
function retryQuiz() {
  score = 0;
  currentQuestion = 0;
  incorrectAnswer = [];
  quizContainer.innerHTML = "";
  resultsContainer.innerHTML = "";
  displayQuestions();
  quizContainer.style.display = "block";
  retryButton.style.visibility = "hidden";
}

// Show the incorrect answers
function showAnswer() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  showAnswerButton.style.display = "none";

  let incorrectAnswersHtml = "";
  incorrectAnswer.forEach((item) => {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${item.question}<br>
        <strong>Your Answer:</strong> ${item.userAnswer}<br>
        <strong>Correct Answer:</strong> ${item.correctAnswer}
      </p>`;
  });

  resultsContainer.innerHTML = `
    <p>You scored ${score} out of ${quizQuestions.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

// // Add event listeners after the DOM content has loaded
// document.addEventListener("DOMContentLoaded", function () {
//   if (startBtn) {
//     startBtn.addEventListener("click", startButton());
//   }
//   if (submitButton) {
//     submitButton.addEventListener("click", checkAnswer);
//   }
//   if (retryButton) {
//     retryButton.addEventListener("click", retryQuiz);
//   }
//   if (showAnswerButton) {
//     showAnswerButton.addEventListener("click", showAnswer);
//   }

//   displayQuestions(); // Start displaying questions if needed
// });
