import { quizQuestions, validateName} from "../functions.js";








describe("Testing array", () => {
    beforeEach(() => {
        quizQuestions.length = 0;
    });
  
    test("array should be defined", () => {
      expect(quizQuestions).toBeDefined();
    });
    });


    describe("Name should be defined", () => { 
        it("should be a string", () => {
            expect(typeof validateName("John")).toBe("boolean");
        });
        it("should not be empty", () => {
            expect(validateName("John")).toBeTruthy();
        });
        it("should not contain numbers", () => {
            expect(validateName("John123")).toBeFalsy();
        });
        it("should be defined", () => {
            expect(validateName).toBeDefined();
        });
        it("should be a function", () => {
            expect(typeof validateName).toBe("function");
        });
    })
