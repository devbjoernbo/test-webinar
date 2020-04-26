import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";

import App from "./components/App";

const Main = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

ReactDOM.render(<Main />, document.querySelector("#root"));
