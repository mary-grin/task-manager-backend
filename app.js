const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const boardRoutes = require('./routes/board');

mongoose.connect('mongodb+srv://hryn_mariia:mariia@cluster0.gntodkb.mongodb.net/task-manager?retryWrites=true&w=majority')
.then(() => console.log('Connect to DB'))
.catch((e) => console.log('Not connect to DB'));

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: [ 'http://localhost:4200' ] }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/board', boardRoutes);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : "Unauthorized"});
    }
  });

module.exports = app;