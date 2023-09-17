import {
  isEmailCorrect,
  isAlphanumericAndAllowedChars,
  isLengthAppropriate,
} from "./validationFunctions";

export const defaultSignInData = {
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
};
