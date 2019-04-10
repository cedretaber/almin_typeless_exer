import * as path from "path";
import * as webpack from "webpack";
import * as bodyParser from "body-parser";

const books = [
  { id: 1, title: "book1", author: "author1" },
  { id: 2, title: "book2", author: "author2" },
  { id: 3, title: "book3", author: "author3" }
];
let nextId = 4;

const config: webpack.Configuration = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  devServer: {
    contentBase: [path.join(__dirname, "public"), path.join(__dirname, "dist")],
    compress: true,
    port: 8080,
    before: (app, _server) => {
      app.get("/api/books", (_req, res) => {
        res.json(books);
      });
      app.post("/api/books", bodyParser.json(), (req, res) => {
        const { title, author } = req.body;
        if (title !== undefined && author !== undefined) {
          const book = { id: nextId++, title, author };
          books.push(book);
          res.json(book);
        } else {
          res.status(400).send("");
        }
      });
      app.get("/api/books/:bookId", (req, res) => {
        try {
          const bookId = Number(req.params.bookId);
          const book = books.find(({ id }) => id == bookId);
          if (book !== undefined) {
            res.json(book);
          } else {
            res.status(404).send("");
          }
        } catch (e) {
          console.error(e);
          res.status(400).send("");
        }
      });
      app.put("/api/books/:bookId", bodyParser.json(), (req, res) => {
        try {
          const bookId = Number(req.params.bookId);
          let i = 0;
          for (; i < books.length; ++i) {
            if (books[i].id === bookId) break;
          }
          if (books[i] !== undefined) {
            const { title, author } = req.body;
            if (title !== undefined && author !== undefined) {
              const book = { id: bookId, title, author };
              books[i] = book;
              res.json(book);
            } else {
              res.status(400).send("");
            }
          } else {
            res.status(404).send("");
          }
        } catch (e) {
          console.error(e);
          res.status(400).send("");
        }
      });
      app.delete("/api/books/:bookId", (req, res) => {
        try {
          const bookId = Number(req.params.bookId);
          let i = 0;
          for (; i < books.length; ++i) {
            if (books[i].id === bookId) break;
          }
          const book = books[i];
          books.splice(i, 1);
          res.json(book);
        } catch (e) {
          console.error(e);
          res.status(400).send("");
        }
      });
      app.get(/^(?!\/api).*(?<!\.(?:js|css))$/, (_req, res) => {
        res.sendFile(path.join(__dirname, "public/index.html"));
      });
    }
  }
};

export default config;
