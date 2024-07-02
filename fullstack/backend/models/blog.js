const pool = require("../database");

const getUsers = async () => {
  try {
    const results = await pool.query("SELECT * FROM users");
    return results.rows;
  } catch (err) {
    console.error("データベースエラー:", err);
    throw err;
  }
};

const getComments = async () => {
  try {
  const results = await pool.query(
    "SELECT * FROM comments ORDER BY createdat DESC");
  return results.rows;
} catch (err) {
  console.error("データベースエラー:", err);
  throw err;
}
};

const getReplies = async () => {
  try {
  const results = await pool.query(
    "SELECT * FROM replies ORDER BY createdat DESC");
  return results.rows;
} catch (err) {
  console.error("データベースエラー:", err);
  throw err;
}
};

const saveComment = async (comment, userId) => {
  try {
    const result = await pool.query(
      "INSERT INTO comments (content, user_id) VALUES ($1, $2) RETURNING *",
      [comment, userId]
    );
    return result.rows[0];
  } catch (err) {
    console.error("データベースエラー:", err);
    throw err;
  }
};

const saveReply = async (commentId, userId, content) => {
  try {
    const result = await pool.query(
      "INSERT INTO replies (comment_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
      [commentId, userId, content]
    );
    return result.rows[0];
  } catch (err) {
    console.error("データベースエラー:", err);
    throw err;
  }
};

const searchComments = async (query) => {
  const results = await pool.query(
    'SELECT * FROM comments WHERE content LIKE $1', [`%${query}%`]);
  return results.rows;
};

const deleteComment = async (commentId) => {
  try {
    await pool.query("DELETE FROM replies WHERE comment_id = $1", [commentId]);
    const result = await pool.query("DELETE FROM comments WHERE id = $1 RETURNING *", [commentId]);
    return result.rows[0];
  } catch (err) {
    console.error("データベースエラー:", err);
    throw err;
  }
};

const deleteReply = async (replyId) => {
  try {
    const result = await pool.query("DELETE FROM replies WHERE id = $1 RETURNING *", [replyId]);
    return result.rows[0];
  } catch (err) {
    console.error("データベースエラー:", err);
    throw err;
  }
};

const updateComment = async (commentId, comment) => {
  try {
    const result = await pool.query(
      "UPDATE comments SET content = $1 WHERE id = $2 RETURNING *",
      [comment, commentId]
    );
    return result.rows[0];
  } catch (err) {
    console.error("データベースエラー:", err);
    throw err;
  }
};

const updateReply = async (replyId, content) => {
  try {
    const result = await pool.query(
      "UPDATE replies SET content = $1 WHERE id = $2 RETURNING *",
      [content, replyId]
    );
    return result.rows[0];
  } catch (err) {
    console.error("データベースエラー:", err);
    throw err;
  }
};

module.exports = { getUsers, getComments, getReplies, saveComment, saveReply, searchComments, deleteComment, deleteReply, updateComment, updateReply  };

// const getBlogs = async () => {
//   const results = await pool.query('SELECT * FROM posts');
//   return results.rows;
// };

// module.exports = {
//   getBlogs,
// };
