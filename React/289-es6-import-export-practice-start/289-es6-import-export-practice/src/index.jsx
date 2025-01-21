import React from "react";
import {createRoot} from "react-dom/client";
import * as cal from "./calculator.js";

//Import the add, multiply, subtract and divide functions
//from the calculator.js file.
//If successful, your website should look the same as the Final.png

const root = createRoot(document.getElementById("root"));

root.render(
  <ul>
    <li>{cal.add(1, 2)}</li>
    <li>{cal.multiply(2, 3)}</li>
    <li>{cal.subtract(7, 2)}</li>
    <li>{cal.divide(5, 2)}</li>
  </ul>
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
