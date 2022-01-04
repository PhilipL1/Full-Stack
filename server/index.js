const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
require("dotenv").config();

app.use(express.json());
app.use(cors());

const db = require("./models");

//Router
const postRouter = require("./routes/posts");
app.use("/posts", postRouter);

const commentRouter = require("./routes/Comments");
app.use("/comments", commentRouter);

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);

db.sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || port, () => {
      console.log("Server running on port " + port);
    });
  })
  .catch((err) => {
    console.error(err);
  });
