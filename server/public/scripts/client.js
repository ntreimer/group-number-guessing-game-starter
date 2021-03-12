$(document).ready(handleReady);
let totalGuesses = 0;

function displayTotalGuesses(){
  $('#totalGuessArea').empty();
  $('#totalGuessArea').append(`<h3>Total Guesses: ${totalGuesses}</h3>`);
}//end displayTotalGuesses

function handleReady() {
  console.log("jquery is loaded!");
  // click handle events
  $('#guessButton').on('click', submitGuess);
  $('#resetButton').on('click', resetRandomNumber)
  displayTotalGuesses();
}
function resetRandomNumber(){
  // send reset request to server

  // tell ajax to POST reset to server
  $.ajax({
    type: 'POST',
    url: '/reset',
    data: 'reset'
  }).then( function(response){
    console.log('back from server POST:', response);
    $('#displayResults').empty()
    totalGuesses = 0;
  }).catch( function( err){
    console.log('error:', err);
  })
}// end resetRandomeNumber

function submitGuess(){
  // grab guesses from DOM
  // arrange into an object
  let guesses = {
    p1Guess: $('#p1Input').val(),
    p2Guess: $('#p2Input').val(),
    p3Guess: $('#p3Input').val(),
    p4Guess: $('#p4Input').val()
  }
  //increase total guesses
  totalGuesses++;
  //display total guesses
  displayTotalGuesses();
  // tell ajax to POST guesses to /guess
  $.ajax({
    type: 'POST',
    url: '/guess',
    data: guesses
  }).then( function(response){
    console.log('back from server POST:', response);
    getGuess();
  }).catch( function( err){
    console.log('error:', err);
  })
}// end submitGuess

function getGuess(){
$.ajax({
  type: 'GET',
  url: '/guess'
}).then( function(response){
  //response will be from server
  displayResults(response);
}).catch( function(err){
  console.log( 'error:', err );

})
};

function displayResults( object ){
    $('#displayResults').empty();
    
    $( '#displayResults' ).append(`
      Player 1: ${object.p1result} 
      Player 2: ${object.p2result}
      Player 3: ${object.p3result}
      Player 4: ${object.p4result}
    `)

}// end displayResults