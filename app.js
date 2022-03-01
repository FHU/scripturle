let express = require("express");
let path = require("path");
let app = express();
var router = express.Router();

var session = require('express-session')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, "public")));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1)
app.use(session({
  secret: 'terces',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


app.get('/v1', (req, res)=> {
  res.render('v1');
});

app.post("/v1", (req, res)=> {

  let secretWord = "hebrews".toUpperCase();

  // extract the guess value from the body
  const guess = req.body.guess.toUpperCase();


  function computeResult(guess, secretWord) {
    
    let result = []
    let answer = ''
    
    for ( let i = 0; i < 7; i++) {

    if (guess[i] === secretWord[i]) {
        answer = 'correct';
    }

    else if( secretWord.includes(guess[i]) ) {
        answer = 'misplaced';
    }

    else {
        answer = 'incorrect';
        
    }


    result.push({letter:guess[i], status: answer}) 

    }


    return result;
  }

  let result = computeResult(guess, secretWord); // = computeResult();




  console.log(secretWord);
  //console.log(secretWord);

  // return the guess
  res.render('v1', {result: result} ) ;

});


app.get('/v2', (req, res)=> {

  let message = "";
  let gameover= false;

  if( !req.session.guesses) {
    req.session.guesses = [];
  }

  let guesses = req.session.guesses;

  req.session.guesses = guesses;
  res.render('v2', {result: guesses, message:message, gameover: gameover});


});


app.post("/v2", (req, res)=> {

  let secretWord = "hebrews".toUpperCase();

  // extract the guess value from the body
  const guess = req.body.guess.toUpperCase();


  function computeResult(guess, secretWord) {
    
    let result = []
    let answer = ''
    
    for ( let i = 0; i < 7; i++) {

    if (guess[i] === secretWord[i]) {
        answer = 'correct';
    }

    else if( secretWord.includes(guess[i]) ) {
        answer = 'misplaced';
    }

    else {
        answer = 'incorrect';
        
    }

    result.push({letter:guess[i], status: answer}) 

    } //end of the for loop


    return result;
  }

  let result = computeResult(guess, secretWord); // = computeResult();


   if( !req.session.guesses) {
    req.session.guesses = [];
  }

  let message = ""
  let gameover = false;


  // get names from session
  let guesses = req.session.guesses;

  req.session.guesses = guesses;

  //if the length of guesses is 7 and message is empty 
  guesses.push(result)

  if (guess === secretWord) {
    message = "Congratulations! You got the word!";
    gameover = true;
  }

  if (guesses.length == 7) {
    if (message === "") {
      message = "You lost, the word was " + secretWord;
      gameover = true;
    }
  }

  if (gameover) {
    req.session.guesses = [];
  }

  // return the guess
  res.render('v2', {result: guesses, message:message, gameover: gameover} ) ;


});



const port = process.env.PORT || 3000;
const hostname = process.env.hostname || "localhost";

app.listen(port, () => {
  console.log(`Running server on http://${hostname}:${port}`);
});
