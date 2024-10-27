import { jest } from "@jest/globals";

import {
  checkAnswers,
  quizQuestions,
  validateName,
  score,
  answers,
  shuffleArray,
  namePrompt,
  resetScore,
} from "../QuizLogic.js";

// Reset score and answers before each test
beforeEach(() => {
  resetScore();
  answers.length = 0;
});

describe("checkAnswers", () => {
  test("should increment score for correct answers", () => {
    answers.push("Pretoria", "Sho", "Soccer City");
    checkAnswers();
    expect(score).toBe(3);
  });

  test("should not increment score for incorrect answers", () => {
    answers.push("Joburg", "Lekker", "Mandela Stadium");
    checkAnswers();
    expect(score).toBe(0);
  });

  test("should ignore out-of-bounds answers", () => {
    answers.push("Pretoria", "Sho", "Soccer City", "Invalid Answer");
    checkAnswers();
    expect(score).toBe(3);
  });
});

describe("validateName", () => {
  test("should return true for valid names", () => {
    expect(validateName("John")).toBe(true);
    expect(validateName("jane")).toBe(true);
    expect(validateName("Alice")).toBe(true);
  });

  test("should return false for names with invalid characters", () => {
    expect(validateName("John123")).toBe(false);
    expect(validateName("Jane!")).toBe(false);
    expect(validateName("Alice@")).toBe(false);
  });

  test("should return false for empty name", () => {
    expect(validateName("")).toBe(undefined);
  });

  test("should return false for null name", () => {
    expect(validateName(null)).toBe(undefined);
  });
});

describe("shuffleArray", () => {
  test("should shuffle the array", () => {
    const originalArray = [1, 2, 3, 4, 5];
    const arrayToShuffle = [...originalArray];
    shuffleArray(arrayToShuffle);

    expect(arrayToShuffle).not.toEqual(originalArray);

    expect(arrayToShuffle.sort()).toEqual(originalArray.sort());
  });

  test("should handle an empty array", () => {
    const emptyArray = [];
    shuffleArray(emptyArray);
    expect(emptyArray).toEqual([]);
  });
});

describe("namePrompt", () => {
  // Mock the prompt and alert functions
  beforeAll(() => {
    global.prompt = jest.fn();
    global.alert = jest.fn();
  });

  test("should return valid name when entered correctly", () => {
    prompt.mockReturnValueOnce("Alice");
    const result = namePrompt();
    expect(result).toBe("Alice");
    expect(alert).not.toHaveBeenCalled();
  });

    test("should show alert for invalid name and prompt again", () => {
      prompt
        .mockReturnValueOnce("12345")
        .mockReturnValueOnce("!@#$%")
        .mockReturnValueOnce("John");

      const result = namePrompt();
      expect(alert).toHaveBeenCalledTimes(2);
      expect(result).toBe("John");
    });

    test("should return undefined if name is canceled", () => {
      prompt.mockReturnValueOnce(null);
      const result = namePrompt();
      expect(result).toBeUndefined();
    });
});
