//Create a react app from scratch.
//It should display 2 paragraph HTML elements.
//The paragraphs should say:
//Created by YOURNAME.
//Copyright CURRENTYEAR.
//E.g.
//Created by Angela Yu.
//Copyright 2019.

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
import React from "react";
import {createRoot} from "react-dom/client";

const root = createRoot(document.getElementById("root"));
const name = "Jimin";

root.render(
    <div>
        <h1>Hello {name}</h1>
        <p>Your lucky number is {Math.round(Math.random()*10)}</p>
        <p>Copyright {new Date().getFullYear()}</p>
    </div>
);