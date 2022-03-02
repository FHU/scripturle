var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressSession = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use( expressSession({
  resave: false,
  saveUninitialized: false,
  secret: "super $ecret phrase 123", 
  cookie: {
    maxAge: 1000*60*10 // in ms
  }
}) );

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
  //next(createError(404));
//});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

app.get('/v1', (req, res)=> {
  res.render('v1');
});

app.post("/v1", (req, res)=> {

  let secretWord = "hebrews".toUpperCase();

  // extract the guess value from the body
  const guess = req.body.guess.toUpperCase();

  let result = []; // = computeResult();

  if(guess === secretWord) {
    result = ['correct', 'correct', 'correct','correct','correct','correct','correct'];
  }
  else {
    result = ['correct', 'misplaced', 'incorrect','incorrect','incorrect','misplaced','misplaced'];
  }

  console.log(result);

  // return the guess
  res.render('v1', {result: result} ) ;

});

app.get('/v2', (req, res)=> {
  if(!req.session.guess) {
    req.session.guess = [];
  }
  guesses = req.session.guess
  res.render('v2', {guesses:guesses});
});

app.post("/v2", (req, res)=> {

  let secretWord = "hebrews".toUpperCase();

  // extract the guess value from the body
  const guess = req.body.guess.toUpperCase();

  let result = []; // = computeResult();

  
  for  (let i = 0; i < 7; i++) {
    if (guess[i] === secretWord[i]) {
      result.push(  {pop: 'correct',
                    letter: guess[i]})
    }
    else {
      if(secretWord.includes(guess[i])) {
        result.push(  {pop: 'misplaced',
                      letter: guess[i]})
      }
      else {
      result.push(  {pop: 'incorrect',
                    letter: guess[i]})
      }
    }
  }

  console.log(result);
  req.session.guess.push(result);

  // return the guess
  res.render('v2', {guesses: req.session.guess} ) ;

});


const port = process.env.PORT || 3000;
const hostname = process.env.hostname || "localhost";

app.listen(port, () => {
  console.log(`Running server on http://${hostname}:${port}`);
});
 