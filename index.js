const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const logger = require("./middleware/logger");
const members = require("./Members");

//Initialize express
const app = express();

//Init Middleware
app.use(logger);

// Handlebars Middleware
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get("/", (req, res) =>
  res.render("index", { title: "Members App", members })
);

//Members API Routes
app.use("/api/members", require("./routes/api/members"));

// Set static folder
app.use(express.static(path.join(__dirname, "Public")));

//listen on a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
