import {
  isAlphabetic,
  isEmailCorrect,
  isLengthAppropriate,
} from "./singUpValidations";

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

export const isInquiryCorrect = (text) => {
  if (text && text.length < 10) {
    return "Inquiry should be at least 10 characters";
  }
  return false;
};
