const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { test: 'Homepage!' });
});

app.use('/static', express.static(path.join(__dirname, 'public')));



app.listen(3000, () => {
  console.log('Application is running on http://localhost:3000/');
});