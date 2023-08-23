import {
  isAlphanumericAndAllowedChars,
  isLengthAppropriate,
} from "./singUpValidations";

export const resetPassword = {
  password: {
    value: "",
    errors: [],
    validations: [
      (password) => isAlphanumericAndAllowedChars(password),
      (password) => isLengthAppropriate(password, 7, 70),
    ],
  },
  repeatPassword: { value: "", errors: [] },
};
