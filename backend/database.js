const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'BLOGS2',
  password: '5858',
  port: 5432,
});

module.exports = pool;
