import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));


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

app.get("/edit/:id", (req, res)=>{
    var editId = req.params.id;

    res.render("edit.ejs", {
        post : posts[editId],
    });
});

app.post("/edit/:id", (req, res)=>{
    const postIndex = posts.findIndex(post => post.id === parseInt(req.params.id));
    console.log(postIndex);
    console.log(posts);
    if (postIndex !== -1) {
        posts[postIndex].title = req.body.title;
        posts[postIndex].content = req.body.content;
        console.log("edit successfully!");
        res.render("home.ejs", {
            posts: posts,
        })
    }
});

app.post("/delete/:id", (req, res)=>{
    var deleteId = req.params.id;
    posts.splice(deleteId, 1);
    console.log(posts);
    console.log("delete successfully");
    res.render("home.ejs", {
        posts : posts,
    });
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});

var posts = [];