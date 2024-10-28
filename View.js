import {
  checkAnswers,
  quizQuestions,
  validateName,
  score,
  answers,
  shuffleArray,
  namePrompt,
  resetScore,
  AddToAnswers
} from "./QuizLogic.js";
import { savePlayerToStorage, loadFromStorage } from "./BrowserStorage.js";

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("result");
const submitButton = document.getElementById("submit-btn");
const retryButton = document.getElementById("retry");
const showAnswerButton = document.getElementById("showAnswer");
const startBtn = document.getElementById("startBtn");
const refreshButton = document.getElementById("refresh");

let isClicked = false;
let retryButtonShowing = true;

const Player = {
  name: "",
  score: 0,
};

let chosenAnswer = "";

let currentQuestion = 0;
let started = false;
let retry_state = false;


function hideButtons() {
  retryButton.style.visibility = "hidden";
  submitButton.style.visibility = `hidden`;
  showAnswerButton.style.visibility = "hidden";
}
hideButtons();


const names = JSON.parse(localStorage.getItem("player")) || [];


function showButtons() {
  if (retryButtonShowing) {
    retryButton.style.visibility = "visible";
  }
  submitButton.style.visibility = `visible`;
  showAnswerButton.style.visibility = "visible";
}

startBtn.addEventListener("click", () => {
  started = true;
  let name = namePrompt();
  if (!name) {
    return;
  }
  alert(`Good Luck, ${name}`);
  displayQuestions();
  Player.name = name;
  names.push(Player);
  savePlayerToStorage(names);
  started = false;
});

 showAnswerButton.addEventListener("click", showAnswer);

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

    if (isClicked && !retry_state) {
      AddToAnswers(chosenAnswer, currentQuestion);
      currentQuestion++;
      
    
      display();
      const element = document.querySelectorAll(".radio");
      element.forEach((ele) => {
        ele.addEventListener("change", (event) => {
          chosenAnswer = ele.value;
          isClicked = true;
          // answers.push(chosenAnswer);
          AddToAnswers(chosenAnswer,currentQuestion);
        });
      });
    } else if (!isClicked && !started && !retry_state) {
      alert("Please select an answer!");
    }
    isClicked = false;
  } else {

    
    checkAnswers();
    quizContainer.innerHTML = "";
    const scoreResult = document.createElement("p");
    scoreResult.className = "score";
    Player.score = score;
    savePlayerToStorage(names);
    scoreResult.innerHTML = `Your score is ${score} out of ${quizQuestions.length}`;
    quizContainer.appendChild(scoreResult);
    showAnswerButton.style.visibility = "visible";
    if (retryButtonShowing) {
      retryButton.style.visibility = "visible";
    }
    
    submitButton.style.visibility = "hidden";
    // hideButtons();
  }
}



function display() {
  showButtons();
  startBtn.style.display = "none";
  showAnswerButton.style.visibility = "hidden";
  retryButton.style.visibility = "hidden";
  // console.log(currentQuestion);
  const question = quizQuestions[currentQuestion];

  const questionElement = document.createElement("div");
  questionElement.className = "question";
  questionElement.innerHTML = `<p>${question.question}</p>`;

  const optionsElement = document.createElement("div");
  optionsElement.className = "options";
  let radio = "";

  const shuffledOptions = [...question.options];
  if (!retryButtonShowing) {
    shuffleArray(shuffledOptions);
  }
  

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


retry.addEventListener("click", () => {
  const confirmRetry = confirm("Are you sure you want to try again?");
  if (confirmRetry) {
    retryButton.style.visibility = "hidden";
    submitButton.style.visibility = `visible`;
    retryQuiz();
  }
});

function retryQuiz() {
  retry_state = true;
  // retryButtonShowing = false;
  resetScore();
  answers.length = 0;
  quizContainer.innerHTML = "";
  resultsContainer.innerHTML = "";
  currentQuestion = 0

  displayQuestions();
  quizContainer.style.display = "block";
  retry_state = false;
  return;

  
}

function showAnswer() {
  // Hide buttons and quiz container if needed
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  showAnswerButton.style.display = "none";

  let incorrectAnswersHtml = "";
  let correctAnswersHtml = "";

  // Loop through the quiz questions and answers
  for (let i = 0; i < quizQuestions.length; i++) {
    const question = quizQuestions[i];
    const userAnswer = answers[i];
    const correctAnswer = question.answer;

    if (userAnswer === correctAnswer) {
      correctAnswersHtml += `
        <p>
          <strong>Question:</strong> ${question.question}<br>
          <strong>Your Answer:</strong> ${userAnswer}<br>
          <strong>Correct Answer:</strong> ${correctAnswer} (Correct!)
        </p>
      `;
    } else {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${question.question}<br>
          <strong>Your Answer:</strong> ${userAnswer}<br>
          <strong>Correct Answer:</strong> ${correctAnswer} (Incorrect)
        </p>
      `;
    }
  }

  resultsContainer.innerHTML = `
    <p>You scored ${score} out of ${answers.length}!</p>
    <p>Correct Answers:</p>
    ${correctAnswersHtml}
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
  retryButton.style.visibility = "hidden";

  refreshButton.addEventListener("click", refreshPage);
}

function refreshPage() {
  refreshButton.style.cursor = "pointer";
  location.reload();
}


export { displayQuestions };
