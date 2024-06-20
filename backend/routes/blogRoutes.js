const express = require('express');
const router = express.Router();
const blogModel = require('../models/blog');

router.get('/posts', async (req, res) => {
  try {
    const posts = await blogModel.getBlogs();
    res.json(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
