const pool = require('../database');

const getUsers = async () => {
  const results = await pool.query('SELECT * FROM users');
  return results.rows;
};

const getComments = async () => {
  const results = await pool.query('SELECT * FROM comments');
  return results.rows;
};

const getReplies = async () => {
    const results = await pool.query('SELECT * FROM replies');
    return results.rows;
};

const saveComment = async (comment, userId) => {
  try {
    const result = await pool.query(
      'INSERT INTO comments (content, user_id) VALUES ($1, $2) RETURNING *',
      [comment, userId]
    );
    return result.rows[0];
  } catch (err) {
    console.error('データベースエラー:', err);
    throw err;
  }
};

const saveReply = async (commentId, userId, content) => {
    try {
      const result = await pool.query(
        'INSERT INTO replies (comment_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
        [commentId, userId, content]
      );
      return result.rows[0];
    } catch (err) {
      console.error('データベースエラー:', err);
      throw err;
    }
  };

module.exports = { getUsers, getComments, getReplies, saveComment, saveReply };

// const getBlogs = async () => {
//   const results = await pool.query('SELECT * FROM posts');
//   return results.rows;
// };

// module.exports = {
//   getBlogs,
// };
