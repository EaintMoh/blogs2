const express = require("express");
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const blogRoutes = require("./routes/blogRoutes");
app.use("/api", blogRoutes);

const blogModel = require("./models/blog");

app.get("/", async (req, res) => {
  try {
    const users = await blogModel.getUsers();
    const comments = await blogModel.getComments();
    const replies = await blogModel.getReplies();
    res.json({ users, comments, replies });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
