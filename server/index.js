const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;

app.use(express.json());
app.use(cors());

const db = require("./models");

//Router
const postRouter = require("./routes/posts");
app.use("/posts", postRouter);

const commentRouter = require("./routes/comments");
app.use("/comments", commentRouter);

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("Server running on port " + port);
  });
});
