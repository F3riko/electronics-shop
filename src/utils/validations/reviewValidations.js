import { isLengthAppropriate, isEmpty } from "./validationFunctions";

export const defaultReviewData = {
  liked: {
    value: "",
    errors: [],
    validations: [(name) => isLengthAppropriate(name, 10, 250)],
  },
  not_liked: {
    value: "",
    errors: [],
    validations: [(name) => isLengthAppropriate(name, 10, 250)],
  },
  comment: {
    value: "",
    errors: [],
    validations: [(name) => isLengthAppropriate(name, 10, 250)],
  },
  rating: {
    value: "",
    errors: [],
    validations: [(name) => isEmpty(name)],
  },
};
