import { nanoid } from "nanoid";

export const isAlphabetic = (inputString) => {
  if (inputString && !/^[a-zA-Z]+$/.test(inputString)) {
    return "Should contain only letters";
  }
  return false;
};

export const isLengthAppropriate = (value, min, max) => {
  if ((value && value.length < min) || value.length > max) {
    return `Should be between ${min} and ${max} characters`;
  }
  return false;
};

export const isEmailCorrect = (email) => {
  const regexPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (email && !regexPattern.test(email)) {
    return "Invalid email address";
  }
  return false;
};

export const isAlphanumericAndAllowedChars = (inputString) => {
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

const validateInput = (name, formData, setFormData) => {
  const value = formData[name].value;
  let errorFlag = false;

  if (formData[name].validations) {
    const updatedErrors = [...formData[name].errors];

    formData[name].validations.forEach((validation) => {
      const error = validation(value);
      if (error) {
        if (updatedErrors.indexOf(error) === -1) {
          updatedErrors.push(error);
        }
        errorFlag = true;
      }
    });

    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        errors: updatedErrors,
      },
    }));
  }

  return errorFlag;
};

export const renderErrors = (formDataKey, formData) => {
  let errors;
  if (formData[formDataKey].errors) {
    errors = formData[formDataKey].errors.map((error) => {
      return (
        <small key={nanoid()}>
          {error}
          <br />
        </small>
      );
    });
  }
  return errors ? errors : null;
};

export const handleChange = (event, setFormData) => {
  const { value, id } = event.target;
  setFormData((prevData) => ({
    ...prevData,
    [id]: { ...prevData[id], value: value, errors: [] },
  }));
};

export const handleBlur = (event, formData, setFormData) => {
  const { id } = event.target;
  validateInput(id, formData, setFormData);
};

export const validateAllInput = (formData, setFormData) => {
  let errors = false;
  for (const key of Object.keys(formData)) {
    let isError = validateInput(key, formData, setFormData);
    if (isError) {
      errors = true;
    }
  }
  return errors;
};
