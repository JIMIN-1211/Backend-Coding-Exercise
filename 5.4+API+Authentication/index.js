import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "jimin";
const yourPassword = "1234";
const yourAPIKey = "20c7f9bd-f352-4c9e-a83c-bec49fafb8c8";
const yourBearerToken = "f84e72e6-88c1-4431-9d0a-6b7c0e5edd86";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async(req, res) => {
  try{
    const response = await axios.get(API_URL+"random");
    const result = response.data;
    console.log(result);
    res.render("index.ejs", {
      content : JSON.stringify(result),
    })
  } catch (err) {
    res.render("index.ejs", {
      content : err.message,
    })
  }
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async(req, res) => {
  try {
    const response = await axios.get(`${API_URL}all?page=2`, {
      auth : {
        username : yourUsername,
        password : yourPassword,
      }
    });
    const result = JSON.stringify(response.data);
    res.render("index.ejs", {
      content : result,
    });
  } catch (err) {
    console.log(err);
    res.render("index.ejs", {
      content : err.message
    });
  }
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async(req, res) => {
  try {
    var randomScore = Math.round(Math.random())+5;
    const response = await axios.get(`${API_URL}filter?score=${randomScore}&apiKey=${yourAPIKey}`);
    const result = JSON.stringify(response.data);
    res.render("index.ejs", {
      content : result,
    });
  } catch (err) {
    console.log(err);
    res.status(404).send("Error : ", err.message);
  }
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", async(req, res) => {
  try {
    const response = await axios.get(`${API_URL}secrets/42`, {
      headers : {
        Authorization : `Bearer ${yourBearerToken}`
      }
    });
    const result = JSON.stringify(response.data);
    res.render("index.ejs",  {
      content: result,
    });
  } catch (err) {
    console.log(err);
    res.status(404).send("Error : ", err.message);
  }
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
