const quizQuestions = [
    { 
        question: ' Which city is also known as Jacaranda city? ', 
        options: ['Joburg', 'Cape Town', 'Pretoria'], 
        answer: 'Pretoria', 
      }, 
    
    { 
        question: "What's the slang used to say “HI” ", 
        options: ['Sho', 'Lekker', 'Dintshang'], 
        answer: 'Sho', 
      }, 
    
    { 
        question: ' What is the other name for FNB Stadium? ', 
        options: ['Soccer City', 'Mandela Stadium', 'Kaizer Chiefs Stadium'], 
        answer: 'Soccer City', 
      },
    
    { 
        question: ' What is the national flower? ', 
        options: ['Rose', 'Protea', 'Lavender'], 
        answer: 'Protea', 
      }, 
    
    { 
        question: "Who was Nelson Mandela's last wife?", 
        options: ['Winnie Mandela', 'Graca Machel', 'Evelyn Mase'], 
        answer: 'Graca Machel', 
      },
    
    { 
        question: ' Which political party is the loudest in Parliament? ', 
        options: ['ANC', 'DA', 'EFF'], 
        answer: 'EFF', 
      },
    
    { 
        question: ' Tallest Mountain in South Africa? ', 
        options: ['Table Mountain', 'Mafadi', 'Kilimanjaro'], 
        answer: 'Mafadi', 
      },
    
    { 
        question: ' Nickname for the popular South African rugby player “Tendai Mtawarira” ', 
        options: ['Elizabeth', 'Beast', 'Faf'],
        answer: 'Beast', 
      },
    
    { 
        question: ' Who is popularly known as uMsholozi? ', 
        options: ['Jacob Zuma', 'Nelson Mandela', 'Cryil Ramaphosa'], 
        answer: 'Jacob Zuma', 
      }, 
    
    { 
        question: 'Who is affectionally know as Cupcake? ', 
        options: ['Babies', 'Cyril Ramaphosa', 'Siya Kolisi'], 
        answer: 'Cyril Ramaphosa', 
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

let currentQuestion = 0;
let score = 0;

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
  const name = prompt("Please enter your name:");
  alert(`Good Luck, ${name}`);
  names.push(name);
  //  Db.saveToStorage('player', name);
  console.log(names);
  saveToStorage();
});

function saveToStorage() {
  localStorage.setItem("player", JSON.stringify(names));
}


