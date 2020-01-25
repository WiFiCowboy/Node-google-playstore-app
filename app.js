const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("common")); // check if this is even needed

const store = require("./playstore.js");
// default get should display
// query parameters = sort and geners
app.get("/apps", (req, res) => {
  const {
    rating = "",
    genres = ""
  } = req.query;
  
  
  // need logic to check if one or the orther is present!!
  // if (!rating) {
  //   return res.status(400).send("Please enter rating");
  // }
  // // this return regardless needs logic
  // let results = store.filter(rate => rate.Rating);
  // // need to check for value of rating
  // if (rating) {
  //   results.sort((a, b) => {
  //     return a.Rating > b.Rating ? 1 : a.Rating < b.Rating ? -1 : 0;
  //   });
  // }


  
  

  let includesGenres = [
    "Action",
    "Puzzle",
    "Strategy",
    "Casual",
    "Arcade",
    "Card"
  ].includes(genres);
  

  if (!includesGenres) {
    return res.status(400).send("Please enter a genre!");
  }

  let storeGenres = store.filter(genre => genre.Genres.includes(genres));
  console.log(storeGenres);
  
  

  // default return
  res.json(storeGenres);
});

app.listen(8000, () => {
  console.log("Server started on PORT 8000");
});
