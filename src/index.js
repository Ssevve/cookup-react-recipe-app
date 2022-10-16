const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const connectDB = require('./config/database');

require('dotenv').config({ path: './src/config/.env' });

const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const recipesRouter = require('./api/recipes');
const authRouter = require('./api/auth');

const app = express();

connectDB();

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  // store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from the api',
  });
});

app.use('/api/recipes', recipesRouter);
app.use('/api/auth', authRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
