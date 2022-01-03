const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });

  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.get("/byUserId/:id", async (req, res) => {
  const userId = req.params.id;
  const listOfPost = await Posts.findAll({
    where: { UserId: userId },
    include: [Likes],
  });
  res.json(listOfPost);
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  await Posts.create(post);
  res.json(post);
});

router.put("/postTitle", validateToken, async (req, res) => {
  const { newTitles, id } = req.body;
  await Posts.update({ title: newTitles }, { where: { id: id } }); //{what fields you want to update} {which post i am talking about }
  res.json(newTitles);
});

router.put("/postText", validateToken, async (req, res) => {
  const { newTexts, id } = req.body;
  await Posts.update({ postText: newTexts }, { where: { id: id } }); //{what fields you want to update} {which post i am talking about }
  res.json(newTexts);
});

router.delete("/:id", validateToken, async (req, res) => {
  const postId = req.params.id;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });
  res.json("deleted successfully");
});

module.exports = router;
