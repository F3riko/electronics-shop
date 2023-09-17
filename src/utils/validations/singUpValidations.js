import {
  isAlphabetic,
  isLengthAppropriate,
  isEmailCorrect,
  isAlphanumericAndAllowedChars,
} from "./validationFunctions";

export const defaultSignUpData = {
  name: {
    value: "",
    errors: [],
    validations: [
      (name) => isAlphabetic(name),
      (name) => isLengthAppropriate(name, 2, 50),
    ],
  },
  email: {
    value: "",
    errors: [],
    validations: [(email) => isEmailCorrect(email)],
  },
  password: {
    value: "",
    errors: [],
    validations: [
      (password) => isAlphanumericAndAllowedChars(password),
      (password) => isLengthAppropriate(password, 7, 70),
    ],
  },
  repeatPassword: { value: "", errors: [] },
  recaptchaResponse: {
    value: "",
    errors: [],
    validations: [
      (response) => {
        return response ? false : "Captcha should be cheked!";
      },
    ],
  },
};
