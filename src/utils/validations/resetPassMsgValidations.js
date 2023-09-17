import { isEmailCorrect } from "./validationFunctions";

export const defaultResetMsgData = {
  email: {
    value: "",
    errors: [],
    validations: [(email) => isEmailCorrect(email)],
  },
};
