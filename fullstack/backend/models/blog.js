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

module.exports = { getUsers, getComments, getReplies };


// const getBlogs = async () => {
//   const results = await pool.query('SELECT * FROM posts');
//   return results.rows;
// };

// module.exports = {
//   getBlogs,
// };

