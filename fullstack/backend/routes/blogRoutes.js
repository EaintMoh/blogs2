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

router.get('/replies', async (req, res) => {
  try {
      const replies = await blogModel.getReplies();
      res.json(replies);
  } catch (err) {
      res.status(500).send(err.message);
  }
});

router.post("/comments", async (req, res) => {
  const { comment, userId } = req.body;
  if (!comment || !userId) {
    return res.status(400).send("コメントまたはユーザーIDがありません。");
  }
  try {
    const newComment = await blogModel.saveComment(comment, userId);
    res.status(201).json(newComment);
  } catch (err) {
    res
      .status(500)
      .send("コメントの保存中にエラーが発生しました: " + err.message);
  }
});

router.post("/replies", async (req, res) => {
  const { commentId, userId, content } = req.body;
  if (!content || !userId || !commentId) {
    return res.status(400).send("コメントID、ユーザーID、または返信内容がありません。");
  }
  try {
    const newReply = await blogModel.saveReply(commentId, userId, content);
    res.status(201).json(newReply);
  } catch (err) {
    res.status(500).send("返信の保存中にエラーが発生しました: " + err.message);
  }
});

module.exports = router;

//   console.log("受け取ったコメント:", req.body.comment);
//   console.log("受け取ったユーザーID:", req.body.userId);

// router.get('/posts', async (req, res) => {
//   try {
//     const posts = await blogModel.getBlogs();
//     res.json(posts);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// module.exports = router;
