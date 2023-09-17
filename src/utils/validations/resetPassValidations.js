import {
  isAlphanumericAndAllowedChars,
  isLengthAppropriate,
} from "./validationFunctions";

export const resetPassDefaultData = {
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
