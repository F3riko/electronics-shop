import {
  isAlphabetic,
  isEmailCorrect,
  isLengthAppropriate,
  isInquiryCorrect,
} from "./validationFunctions";

export const defaultContactUsData = {
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
  inquiry: {
    value: "",
    errors: [],
    validations: [(inquiry) => isInquiryCorrect(inquiry)],
  },
};
