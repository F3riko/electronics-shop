import {
  isLengthAppropriate,
  isAlphabetic,
  isEmailCorrect,
} from "./singUpValidations";

export const defaultAddressData = {
  name: {
    value: "",
    errors: [],
    validations: [
      (name) => isAlphabetic(name),
      (name) => isLengthAppropriate(name, 2, 50),
    ],
  },
  surname: {
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
  phone: {
    value: "",
    errors: [],
    validations: [],
  },
  zip: {
    value: "",
    errors: [],
    validations: [],
  },
  city: {
    value: "",
    errors: [],
    validations: [],
  },
  street: {
    value: "",
    errors: [],
    validations: [],
  },
  address: {
    value: "",
    errors: [],
    validations: [],
  },
  additionalInfo: {
    value: "",
    errors: [],
    validations: [],
  },
};
