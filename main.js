const quizQuestions = [
  {
    question: " Which city is also known as Jacaranda city? ",
    options: ["Joburg", "Cape Town", "Pretoria"],
    answer: "Pretoria",
  },

  {
    question: "What's the slang used to say “HI” ",
    options: ["Sho", "Lekker", "Dintshang"],
    answer: "Sho",
  },

  {
    question: " What is the other name for FNB Stadium? ",
    options: ["Soccer City", "Mandela Stadium", "Kaizer Chiefs Stadium"],
    answer: "Soccer City",
  },

  {
    question: " What is the national flower? ",
    options: ["Rose", "Protea", "Lavender"],
    answer: "Protea",
  },

  {
    question: "Who was Nelson Mandela's last wife?",
    options: ["Winnie Mandela", "Graca Machel", "Evelyn Mase"],
    answer: "Graca Machel",
  },

  {
    question: " Which political party is the loudest in Parliament? ",
    options: ["ANC", "DA", "EFF"],
    answer: "EFF",
  },

  {
    question: " Tallest Mountain in South Africa? ",
    options: ["Table Mountain", "Mafadi", "Kilimanjaro"],
    answer: "Mafadi",
  },

  {
    question:
      " Nickname for the popular South African rugby player “Tendai Mtawarira” ",
    options: ["Elizabeth", "Beast", "Faf"],
    answer: "Beast",
  },

  {
    question: " Who is popularly known as uMsholozi? ",
    options: ["Jacob Zuma", "Nelson Mandela", "Cryil Ramaphosa"],
    answer: "Jacob Zuma",
  },

  {
    question: "Who is affectionally know as Cupcake? ",
    options: ["Babies", "Cyril Ramaphosa", "Siya Kolisi"],
    answer: "Cyril Ramaphosa",
  },
];

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

// // Dialog
// const dialog = document.querySelector("dialog");
// const showButton = document.querySelector("dialog + button");
// const closeButton = document.querySelector("dialog button");

const names = JSON.parse(localStorage.getItem("player")) || [];
// const arr = JSON.parse(localStorage.getItem("todolist")) || [];

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

// "Show the dialog" button opens the dialog modally
// const openDialog = showButton.addEventListener("click", () => {
//     dialog.showModal();
// });

// "Close" button closes the dialog
// const closeDialog = closeButton.addEventListener("click", () => {
//     dialog.close();
// });

function displayQuestions() {
  startBtn.style.display = "none";
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

// function retryQuiz() {
//     const
//     let quizQuestions = 0;
//     currentQuestion = 0;
//     score = 0;
//     displayQuestions();
//     document.getElementById(`submit`).style.visibility = `visible`;
//   }
//   retryQuiz();