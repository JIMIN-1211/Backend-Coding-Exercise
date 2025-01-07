import express from "express";
const port = 3000;
const app = express();

app.get("/", (req, res)=>{
   res.send("Hello world!");
});

app.get("/about", (req, res)=>{
    res.send("<h2>About Me</h2>");
});

app.get("/contact", (req, res)=>{
    res.send("<p>email : jimin@mail.com</p>");
})

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});