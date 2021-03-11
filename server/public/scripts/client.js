$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!");
  $('#guessButton').on('click', submitGuess);
}

function submitGuess(){
  // grab guesses from DOM
  // arrange into an object
  let guesses = {
    p1Guess: $('#p1Input').val(),
    p2Guess: $('#p2Input').val(),
    p3Guess: $('#p3Input').val(),
    p4Guess: $('#p4Input').val()
  }

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
  console.log(response);
}).catch( function (err){
  console.log( err );

})
};// end getGuess