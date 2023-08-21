const isAlphabetic = (inputString) => {
  if (inputString && !/^[a-zA-Z]+$/.test(inputString)) {
    return "Should contain only letters";
  }
  return false;
};

const isLengthAppropriate = (value, min, max) => {
  if ((value && value.length < min) || value.length > max) {
    return `Should be between ${min} and ${max} characters`;
  }
  return false;
};

const isEmailCorrect = (email) => {
  const regexPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (email && !regexPattern.test(email)) {
    return "Invalid email address";
  }
  return false;
};

const isAlphanumericAndAllowedChars = (inputString) => {
  if (inputString && !/^[a-zA-Z0-9_\-!*]+$/.test(inputString)) {
    return "Should contain only letters, digits and _, -, ! or *";
  }
  return false;
};

export const arePasswordsSame = (password, repeatPassword) => {
  if (password && repeatPassword && password !== repeatPassword) {
    return "Password shuld be the same!";
  }
  return false;
};

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

export const validateInput = (name, formData) => {
  const value = formData[name].value;
  const errors = [];
  if (formData[name].validations) {
    formData[name].validations.forEach((validation) => {
      const error = validation(value);
      if (error) {
        errors.push(error);
      }
    });
  }

  return errors;
};
