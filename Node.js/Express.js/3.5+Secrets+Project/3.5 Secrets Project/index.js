//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const port = 3000;;
const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res)=>{
    if(req.body.password === "ILoveProgramming") {
        res.sendFile(__dirname + "/public/secret.html");
    }else {
        res.send("<h1>Wrong Passwrod. </h1>");
    }
})

// var check = false;

// function passwordCheck(req, res, next) {
//     if(req.body.password === "ILoveProgramming"){
//         check = true;
//     }
//     next();
// }

// app.use(passwordCheck);

// app.post("/check", (req, res)=>{
//     if(check) {
//         res.sendFile(__dirname + "/public/secret.html");
//     }else {
//         res.sendFile(__dirname + "/public/index.html");
//         //res.redirect("/");
//     }
// });

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});

