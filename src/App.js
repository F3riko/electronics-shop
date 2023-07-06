import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert } from "react-bootstrap";
// FontAwesomeIcon example import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const element = <FontAwesomeIcon icon={faEnvelope} />;

function App() {
  return (
    <>
      {element}
      <Alert variant="warning">This is a sample alert message.</Alert>
    </>
  );
}

export default App;
