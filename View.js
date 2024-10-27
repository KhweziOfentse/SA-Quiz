import {
  checkAnswers,
  quizQuestions,
  validateName,
  score,
  answers,
  shuffleArray,
  namePrompt,
} from "./QuizLogic.js";
import { savePlayerToStorage, loadFromStorage } from "./BrowserStorage.js";

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit-btn");
const retryButton = document.getElementById("retry-btn");
const showAnswerButton = document.getElementById("showAnswer-btn");
const startBtn = document.getElementById("startBtn");

let isClicked = false;

let chosenAnswer = "";

let currentQuestion = 0;
let started = false;

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

const names = JSON.parse(localStorage.getItem("player")) || [];

startBtn.addEventListener("click", () => {
  started = true;
  let name = namePrompt();
  if (!name) {
    return;
  }
  alert(`Good Luck, ${name}`);
  displayQuestions();
  names.push(name);
  savePlayerToStorage(names);
  started = false;
});

function displayQuestions() {
  display();
  callRadioSector();
}

window.displayQuestions = displayQuestions;

function callRadioSector() {
  const element = document.querySelectorAll(".radio");

  if (currentQuestion < quizQuestions.length - 1) {
    element.forEach((ele) => {
      ele.addEventListener("change", (event) => {
        chosenAnswer = ele.value;
        isClicked = true;
      });
    });

    if (isClicked) {
      currentQuestion++;
      let vaueExist = answers.includes(chosenAnswer);
      if (!vaueExist) {
        answers.push(chosenAnswer);
      }
      display();
      const element = document.querySelectorAll(".radio");
      element.forEach((ele) => {
        ele.addEventListener("change", (event) => {
          chosenAnswer = ele.value;
          isClicked = true;
          answers.push(chosenAnswer);
        });
      });
    } else if (!isClicked && !started) {
      alert("Please select an answer!");
    }
    isClicked = false;
  } else {
    checkAnswers();
    quizContainer.innerHTML = "";
    const scoreResult = document.createElement("p");
    scoreResult.className = "score";
    scoreResult.innerHTML = `Your score is ${score} out of ${quizQuestions.length}`;
    quizContainer.appendChild(scoreResult);
    document.getElementById(`submit`).style.visibility = `hidden`;
  }
}

function display() {
  startBtn.style.display = "none";
  const question = quizQuestions[currentQuestion];

  const questionElement = document.createElement("div");
  questionElement.className = "question";
  questionElement.innerHTML = `<p>${question.question}</p>`;

  const optionsElement = document.createElement("div");
  optionsElement.className = "options";
  let radio = "";

  const shuffledOptions = [...question.options];
  // shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement("label");
    option.className = "option";

    radio = document.createElement("input");
    radio.className = "radio";
    radio.type = "radio";
    radio.name = "quiz";
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = "";
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

export { displayQuestions };
