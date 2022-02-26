let express = require("express");
let path = require("path");
let app = express();
var router = express.Router();

//var session = require('express-session')

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
  res.render('v2');
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

  let guesses = [];

  let result = computeResult(guess, secretWord); // = computeResult();
  //guesses.push(result)
  //req.session.guesses = guesses;



  console.log(secretWord);
  //console.log(secretWord);

  // return the guess
  res.render('v2', {result: result} ) ;

});


router.get('/', function(req, res, next) {

  if( !req.session.guesses) {
    req.session.guesses = [];
  }

  // get names from session
  let guesses = req.session.guesses;

  res.render('index', { 
    guesses:guesses
  });
});



router.post('/', function(req, res) {

  if(!req.session.guesses) {
    req.session.guesses = [];
  }
  const newGuess = req.body.guesses;
  req.session.guesses.push(newGuess);

  res.render('index', {guesses: req.session.guesses});

});

module.exports = router;







const port = process.env.PORT || 3000;
const hostname = process.env.hostname || "localhost";

app.listen(port, () => {
  console.log(`Running server on http://${hostname}:${port}`);
});
