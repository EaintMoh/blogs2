const express = require('express');
const app = express();
const port = 5000;

const blogRoutes = require('./routes/blogRoutes');

app.use('/api', blogRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
