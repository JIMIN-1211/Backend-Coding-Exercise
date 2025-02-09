import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user : 'postgres', 
  host : 'localhost',
  database : 'newSecrets',
  password : 'database',
  port : 5432
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = ($1)", [username]);
    if(checkResult.rows.length > 0){
      res.send("Email already exists. Try again. ");
    }else {
      const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [username, password]);
      console.log(result);
      res.render("secrets.ejs");
    }
  } catch (err) {
    console.log(err);
  }
  
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try{
    const result = await db.query("SELECT * FROM users WHERE email = ($1)", [username]);

    if(result.rows.length > 0){
      const user = result.rows[0];
      const storedPassword = user.password;

      if(storedPassword === password) {
        res.render("secrets.ejs");
      }else {
        res.send("Incorrect password. ");
      }
    }else {
      res.send("User not found. ");
    }
  }catch (err) {
    console.log(err);
  }
  // try{
  //   const checkEmail = await db.query("SELECT password FROM users WHERE email = ($1)", [username]);

  //   if(checkEmail.rows.length < 0){
  //     res.send("Wrong email or password. Try again.");
  //   }
  //   try{
  //     const checkPassword = await db.query("SELECT password FROM users WHERE password = ($1)",[password]);
  //     if(checkPassword.rows.length < 0) {
  //       res.send("Wrong email or password. Try again.");
  //     }else {
  //       res.render("secrets.ejs");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
