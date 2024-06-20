const pool = require('../database');

const getBlogs = async () => {
  const results = await pool.query('SELECT * FROM posts');
  return results.rows;
};

module.exports = {
  getBlogs,
};
