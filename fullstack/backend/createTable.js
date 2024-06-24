const pool = require("./database");

const createTablesQuery = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username character varying
);

CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    createdat TIMESTAMP now, 
	  content character varying
);

CREATE TABLE IF NOT EXISTS replies (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    comment_id INT REFERENCES comments(id) ON DELETE CASCADE,
    createdat TIMESTAMP now, 
	  content character varying
);`;

const createTables = async () => {
  try {
    await pool.query(createTablesQuery);
    console.log(
      "Tables 'users', 'comments', and 'replies' are successfully created"
    );
  } catch (err) {
    console.error("Error creating tables:", err);
  } finally {
    pool.end();
  }
};

createTables();
