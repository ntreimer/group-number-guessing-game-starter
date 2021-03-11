const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

let randomNumberGenerator = Math.floor(Math.random() * 26)

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here
let guesses = {}

app.post('/guess', (req, res)=>{
  console.log('in post');
  guesses = req.body;
  console.log(guesses);
  res.sendStatus( 201 );
})

app.get('/guess', (req, res)=>{
  console.log('in /guess GET' );
  res.send(guessMatch(guesses));
})


app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})

function guessMatch( object ){
  //check if numbers match randomNumberGenerator
  //loop through the array and extract the guesses
  let winner = ""
  console.log(Number(object.p1Guess))
  console.log(randomNumberGenerator)
  //compare the guesses to the randomNumberGenerator
    if(Number(object.p1Guess) === randomNumberGenerator){
      return "{1}"
    }//end if
    if(Number(object.p2Guess) === randomNumberGenerator){
      return "{2}"
    }//end if
    if(Number(object.p3Guess) === randomNumberGenerator){
      return "{3}"
    }//end if
    if(Number(object.p4Guess) === randomNumberGenerator){
      return "{4}"
    }//end if
    return "No winner"

  //return who has it right or if no does
}