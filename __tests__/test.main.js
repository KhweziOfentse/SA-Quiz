import { validateName, quizQuestions } from "../functions.js";

describe("Testing array", () => {
    beforeEach(() => { //adds mock data to make sure it is not empty
        quizQuestions.push({
            question: "What is the capital of South Africa?",
            options: ["Johannesburg", "Cape Town", "Pretoria"],
            answer: "Pretoria"
        });
    });
    //clears the array after each test
    afterEach(() => {
        quizQuestions.length = 0;
    });

    test("quizQuesstions should not be empty", () => {
        expect(quizQuestions.length).toBeGreaterThan(0);
    });
  
    test("array should be defined", () => {
      expect(Array.isArray(quizQuestions)).toBe(true);
    });

});

// function validateName(name) {
//     let loweCaseChar = name.toLowerCase();
//     for (let i = 0; i < name.length; i++) {
//       if (letters.search(loweCaseChar[i]) == -1) {
//         return false;
//       }
//     }
//     return true;
//   }

// describe("validateName function", () => {
//     it("should be defined", () => {
//         expect(validateName).toBeDefined();
//     });
    // it("should not be empty", () => {
    //     expect(validateName("John")).toBeTruthy();
    // });
    // it("should not contain numbers", () => {
    //     expect(validateName("John123")).toBeFalsy();
    // });
    // it("should be defined", () => {
    //     expect(validateName).toBeDefined();
    // });
   


