let express = require("express");
let path = require("path");
let app = express();
let expressSession = require("express-session");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, "public")));

app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: "aberoihg;OUWE4",
}));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

//#region /v1
app.get('/v1', (req, res) => {
  res.render('v1');
});

app.post("/v1", (req, res) => {

  let secretWord = "HEBREWS".toUpperCase();

  // extract the guess value from the body
  const guess = req.body.guess.toUpperCase();

  let result = getResult(secretWord, guess);

  console.log(result);

  // return the guess
  res.render('v1', { result: result });

});
//#endregion

//#region /v2
app.get('/v2', (req, res) => {
  res.render('v2');
});

app.post("/v2", (req, res) => {

  if (!req.session.guesses && !req.session.guessCount) {
    req.session.guesses = [];
    req.session.guessCount = 0;
  }

  let secretWord = "GOLIATH".toUpperCase();

  // extract the guess value from the body & get result
  const guess = req.body.guess.toUpperCase();
  let result = getResult(secretWord, guess);

  // add guess to req.session.guesses
  req.session.guesses.push(result);
  req.session.guessCount++;

  console.log(req.session.guesses, req.session.guessCount);

  // return guesses
  res.render('v2', { guesses: req.session.guesses, max: req.session.guessCount == 7 });

});
//#endregion

app.get('/', (req, res) => {
  res.send(`<a href="http://${hostname}:${port}/v1">scripturle v1</a>
  <br>
  <a href="http://${hostname}:${port}/v2">scripturle v2</a>`);
});

const port = process.env.PORT || 3000;
const hostname = process.env.hostname || "localhost";

app.listen(port, () => {
  console.log(`Running server on http://${hostname}:${port}`);
});


function getResult(secretWord, guess) {
  let resultArray = [];
  let secretCopy = secretWord;

  // check for correct
  for (let i = 0; i < secretWord.length; i++) {
    if (guess[i] === secretWord[i]) {
      resultArray[i] = { letter: guess[i], value: "correct" };
      secretCopy = secretCopy.replace(guess[i], "");
    }
  }

  // check for misplaced, otherwise incorrect
  for (let i = 0; i < secretWord.length; i++) {
    if (secretCopy.includes(guess[i]) && resultArray[i] === undefined) {
      resultArray[i] = { letter: guess[i], value: "misplaced" };
      secretCopy = secretCopy.replace(guess[i], "");
    }
  }

  // fill in rest of array with incorrect
  for (let i = 0; i < secretWord.length; i++) {
    if (resultArray[i] === undefined) {
      resultArray[i] = { letter: guess[i], value: "incorrect" };
    }
  }

  console.log(resultArray);
  return resultArray;
}