$(document).ready(handleReady);
let totalGuesses = 0;

function checkWinner(object){
  if (object.p1result === "Correct"){
    alert('PLAYER 1 IS A WINNER!!!!!!!!!!!!!!!');
  }
  else if (object.p2result === "Correct"){
    alert('PLAYER 2 IS A WINNER!!!!!!!!!!!!!!!');
  }
  else if (object.p3result === "Correct"){
    alert('PLAYER 3 IS A WINNER!!!!!!!!!!!!!!!');
  }
  else if (object.p4result === "Correct"){
    alert('PLAYER 4 IS A WINNER!!!!!!!!!!!!!!!');
  }
}//end checkWinner

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
  checkWinner(response);
}).catch( function(err){
  console.log( 'error:', err );

})
};

function displayResults( object ){
    $('#displayResults').empty();
    
    $( '#displayResults' ).append(`
      <h3>Player 1:</h3> ${object.p1result} 
      <h3>Player 2:</h3> ${object.p2result}
      <h3>Player 3:</h3> ${object.p3result}
      <h3>Player 4:</h3> ${object.p4result}
    `)

}// end displayResults