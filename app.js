let express = require("express");
let path = require("path");
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, "public")));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.get('/v1', (req, res)=> {
  res.render('v1');
});

app.post("/v1", (req, res)=> {

  let secretWord = "hebrews".toUpperCase();

  // extract the guess value from the body
  const guess = req.body.guess.toUpperCase();

  let result = []; // = computeResult();

  for(letter in guess) {
    if (letter === secretWord[letter]) {
      answer = 'correct';
    }
    else if (secretWord.includes(letter)){
      answer = 'misplaced';
    }
    else {
      answer = 'incorrect';
    }
    result.push({letter , status: answer});
  }

  console.log(result);

  // return the guess
  res.render('v1', {result: result} ) ;

});

app.get('/v2', (req, res)=> {
  res.render('v2');
});

app.post("/v2", (req, res)=> {

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


const port = process.env.PORT || 3000;
const hostname = process.env.hostname || "localhost";

app.listen(port, () => {
  console.log(`Running server on http://${hostname}:${port}`);
});
