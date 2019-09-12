const express = require("express");
const models = require("./models");
const cors = require("cors");
const app = express();
const randomCoordinates = require("random-coordinates");

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

app.post("/books/delete/:id", async (req, res, next) => {
  const id = req.params.id;
  const deleteBook = await models.Book.destroy({
    where: {
      id
    }
  });
  try {
    res.json(deleteBook);
  } catch (error) {
    res.json(error);
  }
});

// random coordinates generator

app.get("/coordinates", (req, res) => {
  let coordinatesArray = [];
  while (coordinatesArray.length !== 5) {
    const [lat, long] = randomCoordinates().split(", ");
    const coordinate = { lat, long };
    coordinatesArray = [...coordinatesArray, coordinate];
  }
  res.json(coordinatesArray);
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
var port = normalizePort(process.env.PORT || "3000");
app.listen(port, () => console.log(`Example app listening on port ${port}`));
