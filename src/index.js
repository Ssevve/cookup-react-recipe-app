const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const connectDB = require('./config/database');

require('dotenv').config({ path: './src/config/.env' });

// Passport config
require('./config/passport')(passport);

const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const recipesRouter = require('./api/recipes');
const authRouter = require('./api/auth');

const app = express();

connectDB();

app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from the api',
  });
});

app.use('/recipes', recipesRouter);
app.use('/auth', authRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at http://localhost:${port}`);
});
