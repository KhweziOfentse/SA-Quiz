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

  const letters = "abcdefghijklmnopqrstuvwxyz";


  function validateName(name) {
    let loweCaseChar = name.toLowerCase();
    for (let i = 0; i < name.length; i++) {
      if (letters.search(loweCaseChar[i]) == -1) {
        return false;
      }
    }
    return true;
  }

  export {quizQuestions, validateName}; 