import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended : true}));

var editPost;

app.get("/", (req, res)=>{
    res.render("login.ejs");
});

app.get("/home", (req, res)=>{
    res.render("home.ejs", {
        posts : posts,
    });
});

app.post("/home", (req, res)=>{
    posts.push({
        title: req.body.title,
        content : req.body.content,
    });
    res.render("home.ejs", {
        posts : posts,
    });
});

app.get("/newPost", (req, res)=>{
    res.render("newPost.ejs");
});

app.get("/edit", (req, res)=>{
    console.log(req.body);
    res.redirect("/home");
})

// app.patch("/home", (req, res)=>{
//     res.render("home.ejs", {
//         name : req.body.name,
//         posts : posts,
//     });
// })

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});

var posts = [];