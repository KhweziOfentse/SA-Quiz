const quizQuestions = [];

// {
//     question: 'Which is the largest ocean on Earth?',
//     options: [
//       'Pacific Ocean',
//       'Indian Ocean',
//       'Atlantic Ocean',
//       'Arctic Ocean',
//     ],
//     answer: 'Pacific Ocean',
//   },

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit-btn");
const retryButton = document.getElementById("retry-btn");
const showAnswerButton = document.getElementById("showAnswer-btn");
const startBtn = document.getElementById("startBtn");
const letters = "abcdefghijklmnopqrstuvwxyz";
let isClicked = false;

let currentQuestion = 0;
let score = 0;

const names = JSON.parse(localStorage.getItem("player")) || [];

// this function saves the names array to the local storage
class Db {
  static saveToStorage(storageName, storageData) {
    localStorage.setItem(storageName, JSON.stringify(storageData));
  }

  static loadFromStorage(storageName) {
    return JSON.parse(localStorage.getItem(storageName)) || [];
  }
}

//user press starts button and they have to enter their name
startBtn.addEventListener("click", () => {
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
});

function saveToStorage() {
  localStorage.setItem("player", JSON.stringify(names));
}
function validateName(name) {
  let loweCaseChar = name.toLowerCase();
  for (let i = 0; i < name.length; i++) {
    if (letters.search(loweCaseChar[i]) == -1) {
      return false;
    }
  }
  return true;
}

//shuffles array so everything in the array get a chance to be swapped
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

displayQuestions();


function displayQuestions() {
  // startBtn.style.display = "none";
  const question = quizQuestions[currentQuestion];
  console.log(currentQuestion);

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
  if (currentQuestion < quizQuestions.length - 1) {
    const element = document.querySelectorAll(".radio");
    element.forEach((ele) => {
    
    
      ele.addEventListener("change", (event) => {
        isClicked = true;
        
      });
    
    });
    
    // if(isClicked){
    //     currentQuestion++;
    // }else{
    //     alert("Please select an answer!");
    //     return;
    // }

    
  }

   else {
    document.getElementById(`submit`).style.visibility = `hidden`;

   }
    
  } 

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

// displayQuestions();
// });

retry.addEventListener("click", () => {
  const confirmRetry = confirm("Are you sure you want to try again?");
if (confirmRetry) {
  retryQuiz();
}

});

function retryQuiz() {
  score = 0;
  quizContainer.innerHTML = "";
  resultsContainer.innerHTML = '';
  let lastQuestionIndex = -1;
  let randomIndex;
  do {
      randomIndex = Math.floor(Math.random() * quizQuestions.length);
  } while (randomIndex === lastQuestionIndex);
  
  displayQuestions();
  score = 0;
  quizContainer.style.display = "block";
  return;
  
  document.getElementById("retry-btn").style.visibility = "hidden";
    document.getElementById(`submit`).style.visibility = `visible`;
  }
  retryQuiz();