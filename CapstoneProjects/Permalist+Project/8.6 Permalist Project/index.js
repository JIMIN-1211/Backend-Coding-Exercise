import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user : 'postgres', 
  host: 'localhost', 
  database : 'newWorld', 
  password : 'database', 
  port : 5432,
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

app.get("/", async(req, res) => {
  try{
    const result = await db.query("SELECT * FROM items ORDER BY id ASC");
    console.log(result.rows);
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: result.rows,
    });
  }catch (err) {
    console.log(err);
  }
});

app.post("/add", async(req, res) => {
  const item = req.body.newItem;
  try{
    await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
    res.redirect("/");
  }catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

app.post("/edit", async(req, res) => {
  try{
    const editId = req.body.updatedItemId;
    const editContent = req.body.updatedItemTitle;
    await db.query("UPDATE items SET title = ($1) WHERE id = ($2)", [editContent, editId]);
    res.redirect("/");
  }catch (err) {
    console.log(err);
  }
});

app.post("/delete", async(req, res) => {
  try{
    const deleteId = req.body.deleteItemId;
    await db.query("DELETE FROM items WHERE id = ($1)", [deleteId]);
    res.redirect("/");
  }catch (err ){
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
