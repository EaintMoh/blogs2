const express = require("express");
const router = express.Router();
const blogModel = require("../models/blog");

router.get("/users", async (req, res) => {
  try {
    const users = await blogModel.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/comments", async (req, res) => {
  try {
    const comments = await blogModel.getComments();
    res.json(comments);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/replies", async (req, res) => {
  try {
    const replies = await blogModel.getReplies();
    res.json(replies);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// router.get('/posts', async (req, res) => {
//   try {
//     const posts = await blogModel.getBlogs();
//     res.json(posts);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

module.exports = router;
