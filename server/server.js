const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

const randomNumberGenerator = () =>{
  return Math.floor(Math.random() * 26)}

let randomNumber = randomNumberGenerator();

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}));

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here
let guesses = {};

app.post('/guess', (req, res)=>{
  console.log('in post');
  guesses = req.body;
  console.log(guesses);
  res.sendStatus( 201 );
})

app.post('/reset', (req, res)=>{
  console.log('in post');
  randomNumber = randomNumberGenerator();
  res.sendStatus( 200 );
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
  let p1result = "";
  let p2result = "";
  let p3result = "";
  let p4result = "";
  console.log(randomNumber)
  //compare the guesses to the randomNumberGenerator
    if(Number(object.p1Guess) === randomNumber){
      p1result = "Correct"
    }else if (Number(object.p1Guess) > randomNumber){
      p1result = "High"
    }else{
      p1result = "Low"
    }//end p1
    if(Number(object.p2Guess) === randomNumber){
      p2result = "Correct"
    }else if (Number(object.p2Guess) > randomNumber){
      p2result = "High"
    }else{
      p2result = "Low"
    }//end p2
    if(Number(object.p3Guess) === randomNumber){
      p3result = "Correct"
    }else if (Number(object.p3Guess) > randomNumber){
      p3result = "High"
    }else{
      p3result = "Low"
    }//end p3
    if(Number(object.p4Guess) === randomNumber){
      p4result = "Correct"
    }else if (Number(object.p4Guess) > randomNumber){
      p4result = "High"
    }else{
      p4result = "Low"
    }//end p4
    return {
      p1result: p1result,
      p2result: p2result,
      p3result: p3result,
      p4result: p4result
    }

  //return who has it right or if no does
}