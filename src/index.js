const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(morgan('common'));
app.use(helmet());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from the backend',
  });
});

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
