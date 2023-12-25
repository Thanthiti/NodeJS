require("dotenv").config()

const express = require("express");
const app = express();
const port = process.env.port || 3000;

app.get("/", (req, res) =>{
  res.send("Hello world")
  
});

app.listen( port,() => {
    console.log(`Example app listing at http://localhost:${port}`);
  },
);