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


/* EXAMPLE */

let mark = { first: "Mark", last: "Hamill", age: "70" };

app.get("/example/:age", (req, res) => {
  let ageSentence = "";
  const age = parseInt(req.params.age);

  if (age > mark.age) {
    ageSentence = "You're older than Mark Hamill!";
  } else if (age < mark.age) {
    ageSentence = "You're younger than Mark Hamill!";
  } else {
    ageSentence = "You are Mark Hamill!";
  }
  const page = `<html>
                    <head> </head>
                    <body> 
                      <h1> Example </h1>
                      <p> ${ageSentence} </p>
                    </body>
                </html>`;

  //res.render('index', ageSentence);

  res.send(page);
});


app.post('/example', (req,res) => {

  let age = req.body.age;

  if (age > mark.age) {
    ageSentence = "You're older than Mark Hamill!";
  } else if (age < mark.age) {
    ageSentence = "You're younger than Mark Hamill!";
  } else {
    ageSentence = "You are Mark Hamill!";
  }
  const page = `<html>
                    <head> </head>
                    <body> 
                      <h1> Example </h1>
                      <p> ${ageSentence} </p>
                    </body>
                </html>`;

  //res.render('index', ageSentence);

  res.send(page);

});


const port = process.env.PORT || 3000;
const hostname = process.env.hostname || "localhost";

app.listen(port, () => {
  console.log(`Running server on http://${hostname}:${port}`);
});
