export const handleModalClose = (modalName, setStateFunc) => {
  setStateFunc((prevValue) => ({ ...prevValue, [modalName]: false }));
};

export const handleModalShow = (modalName, setStateFunc) => {
  setStateFunc((prevValue) => ({ ...prevValue, [modalName]: true }));
};
