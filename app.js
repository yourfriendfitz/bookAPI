const express = require("express");
const models = require("./models");
const cors = require("cors")
const app = express();
const port = process.env.PORT | 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/books", async (req, res, next) => {
  const books = await models.Book.findAll();
  res.json(books);
});

app.post("/books/add", async (req, res, next) => {
  const title = req.body.title;
  const author = req.body.author;
  const imageUrl = req.body.imageUrl;
  const book = models.Book.build({
    title,
    author,
    imageUrl
  });
  try {
    const response = await book.save();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
