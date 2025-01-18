import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user : "postgres", 
  host : "localhost", 
  database : "newWorld", 
  password : "database",
  port : 5432, 
});

const app = express();
const port = 3000;

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisisted() {
  const results = await db.query("SELECT country_code FROM visited_countries ORDER BY id ASC;");
  let countries = [];
  results.rows.forEach((result) => {
    countries.push(result.country_code);
  });

  return countries;
}

app.get("/", async (req, res) => {
  //Write your code here.
  const countries = await checkVisisted();
  console.log(countries);
  res.render("index.ejs", { 
    countries : countries,
    total : countries.length,
  });
});

app.post("/add", async(req, res)=>{
  try {
    const result = await db.query(
        `SELECT country_code FROM countries WHERE UPPER(country_name) LIKE '%${req.body.country.toUpperCase()}%'`
    ); 
      
    const data = result.rows[0];
    const countryCode = data.country_code;
    try{
     

      await db.query(
        `INSERT INTO visited_countries (country_code) VALUES ($1);`, 
      [countryCode]);
      
      res.redirect("/");
    } catch(error) {
      const countries = await checkVisisted();
      res.render("index.ejs", {
        error : "Country has already been added, try again. ", 
        countries : countries, 
        total : countries.length,
      });
    }
  } catch(error) {
    const countries = await checkVisisted();
    res.render("index.ejs", {
        error : "Country does not exist, try again. ",
        countries : countries, 
        total : countries.length,
      }
    );
  }

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
