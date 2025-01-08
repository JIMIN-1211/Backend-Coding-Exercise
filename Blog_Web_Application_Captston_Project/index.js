import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

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
        id : posts.length,
        title: req.body.title,
        content : req.body.content,
    });
    console.log(posts);
    res.render("home.ejs", {
        posts : posts,
    });
});

app.get("/newPost", (req, res)=>{
    res.render("newPost.ejs");
});

app.get("/edit", (req, res)=>{
    var editId = req.query.id;

    res.render("edit.ejs", {
        post : posts[editId],
    });
});

app.patch("/home", (req, res)=>{
    posts[req.query.id].title = req.body.title;
    posts[req.query.id].content = req.body.content;

    res.render("home.ejs", {
        posts : posts,
    });

    console.log(posts);
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});

var posts = [];