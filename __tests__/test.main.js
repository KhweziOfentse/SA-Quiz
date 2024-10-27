import { quizQuestions} from "../functions.js";

describe("Testing array", () => {
    beforeEach(() => {
        quizQuestions.length = 0;
    });
  
    test("array should be defined", () => {
      expect(Array.isArray(quizQuestions)).toBe(true);
    });

    test("quizQuesstions should start as an emty array", () => {
        expect(quizQuestions.length).toBe(0);
    });

    test("quizQuesstions should have objects with question properties"), () = > {
        quizQuestions.push({
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris"
        })
    }

    // test("array should not be empty", () => {
    //   expect(quizQuestions.length).toBeGreaterThan(0);
    // });
    });
