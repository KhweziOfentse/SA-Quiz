"use strict";

/**
 * This function imports the quiz questions and the validateName function
 * from the functions.js file
 */
import { quizQuestions, validateName } from "./functions.js";

/**
 * This is the HTML element where the quiz questions will be displayed
 */
const quizContainer = document.getElementById("quiz");

/**
 * This is the HTML element where the results will be displayed
 */
const resultsContainer = document.getElementById("results");

/**
 * This is the button that the user will click to submit their answers
 */
const submitButton = document.getElementById("submit-btn");

/**
 * This is the button that the user will click to retry the quiz
 */
const retryButton = document.getElementById("retry-btn");

/**
 * This is the button that the user will click to show the answers
 */
const showAnswerButton = document.getElementById("showAnswer-btn");

/**
 * This is the button that the user will click to start the quiz
 */
const startBtn = document.getElementById("startBtn");

/**
 * This variable keeps track of whether or not the user has clicked the
 * start button
 */
let isClicked = false;

/**
 * This variable keeps track of the current question being displayed
 */
let currentQuestion = 0;

/**
 * This variable keeps track of the user's score
 */
let score = 0;

let incorrectAnswer = [];

/**
 * This is the dialog that will be used to display the results of the quiz
 */
// const dialog = document.querySelector("dialog");

// /**
//  * This is the button that the user will click to open the dialog
//  */
// const showButton = document.querySelector("dialog + button");

// /**
//  * This is the button that the user will click to close the dialog
//  */
// const closeButton = document.querySelector("dialog button");

/**
 * This is an array that will store the names of the users who have taken
 * the quiz
 */
const names = JSON.parse(localStorage.getItem("player")) || [];
// const arr = JSON.parse(localStorage.getItem("todolist")) || [];

/**
 * This class is used to save the names array to the local storage
 */
class Db {
  /**
   * This function saves the names array to the local storage
   * @param {string} storageName the name of the item to save
   * @param {array} storageData the array to save
   */
  static saveToStorage(storageName, storageData) {
    localStorage.setItem(storageName, JSON.stringify(storageData));
  }

  /**
   * This function loads the names array from the local storage
   * @param {string} storageName the name of the item to load
   * @return {array} the array loaded from the local storage
   */
  static loadFromStorage(storageName) {
    return JSON.parse(localStorage.getItem(storageName)) || [];
  }
}

/**
 * This function is called when the user presses the start button
 */
// startBtn.addEventListener("click", () => {
//   let name = prompt("Please enter your name:");
//   let valid = validateName(name);
//   while (name === undefined || name.trim() === "" || !valid) {
//     alert("Please enter a valid name!");
//     name = prompt("Please enter your name:");
//     valid = validateName(name);
//   }
//   alert(`Good Luck, ${name}`);
//   displayQuestions();
//   names.push(name);
//   saveToStorage();
// });

/**
 * This function saves the names array to the local storage
 */
function saveToStorage() {
  localStorage.setItem("player", JSON.stringify(names));
}

/**
 * This function shuffles the array so that all the elements have a chance to be swapped
 * @param {array} arr the array to shuffle
 */
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function startButton() {
  let name = prompt("Please enter your name:");
  let valid = validateName(name);
  while (name === undefined || name.trim() === "" || !valid) {
    alert("Please enter a valid name!");
    name = prompt("Please enter your name:");
    valid = validateName(name);
  }
  alert(`Good Luck, ${name}`);
  displayQuestions();
  names.push(name);
  saveToStorage();
}

/**
 * This function displays the current question and options
 */
function displayQuestions() {
  console.log(currentQuestion);
  startBtn.style.display = "none";
  const question = quizQuestions[currentQuestion];

  const questionElement = document.createElement("div");
  questionElement.className = "question";
  questionElement.innerHTML = `<p>${question.question}</p>`;

  const optionsElement = document.createElement("div");
  optionsElement.className = "options";
  // let radio =();

  const shuffledOptions = [...question.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement("label");
    option.className = "option";

    const radio = document.createElement("input");
    radio.className = "radio";
    radio.type = "radio";
    radio.name = "quiz";
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = ""; //clears previous question
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);

  // submitButton.style.visibility = "visible";

  //checks selcted radio input then moves to the next question
  if (currentQuestion < quizQuestions.length - 1) {
    const element = document.querySelectorAll(".radio");
    element.forEach((ele) => {
      ele.addEventListener("change", (event) => {
        isClicked = true;
        currentQuestion++;
      });
    });

    // if(isClicked){
    //     currentQuestion++;
    // }else{
    //     alert("Please select an answer!");
    //     return;
    // }
  } else {
    document.getElementById(`submit`).style.visibility = `hidden`;
  }
}

//adds event listener to retry button
retry.addEventListener("click", () => {
  const confirmRetry = confirm("Are you sure you want to try again?");
  if (confirmRetry) {
    retryQuiz();
  }
});
function retryQuiz() {
  score = 0;
  quizContainer.innerHTML = "";
  resultsContainer.innerHTML = "";
  let lastQuestionIndex = -1;
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * quizQuestions.length);
  } while (randomIndex === lastQuestionIndex);

  displayQuestions();
  score = 0;
  quizContainer.style.display = "block";
  document.getElementById("retry-btn").style.visibility = "hidden";
  return;
}

function showAnswer() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  showAnswerButton.style.display = "none";

  let incorrectAnswersHtml = "";
  for (let i = 0; i < incorrectAnswersHtml.length; i++) {
    incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswersHtml[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswersHtml[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswersHtml[i].correctAnswer}
        </p>
      `;
  }

  resultsContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
}

document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submit-btn");
  const retryButton = document.getElementById("retry-btn");
  const showAnswerButton = document.getElementById("showAnswer-btn");
  const startBtn = document.getElementById("startBtn");

  if (startBtn) {
    startBtn.addEventListener("click", startButton);
  }
  if (submitButton) {
    submitButton.addEventListener("click", checkAnswer);
  }
  if (retryButton) {
    retryButton.addEventListener("click", retryQuiz);
  }
  if (showAnswerButton) {
    showAnswerButton.addEventListener("click", showAnswer);
  }

  displayQuestions();
});

// "Submit" button checks if the user's answer is correct
// submitButton.addEventListener("click", () => {
// const userAnswer = document.querySelector('');
// console.log("clicked submit button");
// currentQuestion++;
// displayQuestions();

// if (!userAnswer) {
//     alert("Please select an answer.");
//     return;
// }

// if (userAnswer.value === quizQuestions[currentQuestion].answer) {
//     score++;
// }

// if (currentQuestion === quizQuestions.length) {
//     // showResults();
//     return;
// }
