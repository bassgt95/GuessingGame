function generateWinningNumber() {
    return Math.floor(Math.random() * 100 + 1);
}

function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }

  function Game() {
      this.playersGuess = null;
      this.pastGuesses = [];
      this.winningNumber = generateWinningNumber();
  }

  Game.prototype = {
      difference : function() {
        return Math.abs(this.playersGuess - this.winningNumber);
      },
      isLower : function() {
        return this.playersGuess < this.winningNumber;
      },
      playersGuessSubmission : function(num) {
          if(num < 1 || num > 100 || num % 1 || isNaN(num)) {
              throw 'That is an invalid guess.';
          }
          this.playersGuess = num;
          return this.checkGuess();
      },
    //   checkGuess : function() {
    //       if (this.playersGuess === this.winningNumber) {
    //           return 'You Win!';
    //       }
    //       if (this.pastGuesses.includes(this.playersGuess)) {
    //           return 'You have already guessed that number.';
    //       }
    //       this.pastGuesses.push(this.playersGuess);
    //       if (this.pastGuesses.length === 5) {
    //           return 'You Lose.';
    //       }
    //       if (this.difference() < 10) {
    //           return 'You\'re burning up!';
    //       }
    //       if (this.difference() < 25) {
    //           return 'You\'re lukewarm.';
    //       }
    //       if (this.difference() < 50) {
    //           return 'You\'re a bit chilly.';
    //       }
    //       if (this.difference() < 100) {
    //         return 'You\'re ice cold!';
    //     }
    //   },
      provideHint : function() {
          return shuffle([this.winningNumber, generateWinningNumber(), generateWinningNumber()]);
      }
  }

Game.prototype.checkGuess = function() {
    if(this.playersGuess===this.winningNumber) {
        $('#hint, #submit').prop("disabled",true);
        $('#subtitle').text("Press the Reset button to play again!")
        return 'You Win!'
    }
    else {
        if(this.pastGuesses.indexOf(this.playersGuess) > -1) {
            return 'You have already guessed that number.';
        }
        else {
            this.pastGuesses.push(this.playersGuess);
            $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
            if(this.pastGuesses.length === 5) {
                $('#hint, #submit').prop("disabled",true);
                $('#subtitle').text("Press the Reset button to play again!")
                return 'You Lose.';
            }
            else {
                var diff = this.difference();
                if(this.isLower()) {
                    $('#subtitle').text("Guess Higher!")
                } else {
                    $('#subtitle').text("Guess Lower!")
                }
                if(diff < 10) return'You\'re burning up!';
                else if(diff < 25) return'You\'re lukewarm.';
                else if(diff < 50) return'You\'re a bit chilly.';
                else return'You\'re ice cold!';
            }
        }
    }
}

function newGame() {
    return new Game();
}

Game.prototype.provideHint = function(){
    return shuffle([this.winningNumber, generateWinningNumber(), generateWinningNumber()]);
}

// function makeGuess(game){
//     alert('makeGuess');
//     let guess = $("#player-input").val();
//     $("#player-input").val("");
//     let output = game.playersGuessSubmission(parseInt(guess));
//     $("#title").text(output);
// }

$(document).ready(function() {
    var game = new Game();

    function makeAGuess(game){
        let guess = $("#player-input").val();
        $("#player-input").val("");
        let output = game.playersGuessSubmission(parseInt(guess));
        $("#title").text(output);
    }
    
    $('#submit').on('click', function() {
       makeAGuess(game);
    })

    $('#player-input').keypress(function(event) {
        if ( event.which == 13 ) {
           makeAGuess(game);
        }
    })

    $('#hint').on('click', function() {
        var hints = game.provideHint();
        $('#title').text('The winning number is '+hints[0]+', '+hints[1]+', or '+hints[2]);
    });

    $('#reset').on('click', function() {
        game = newGame();
        $('#title').text('Play the Guessing Game!');
        $('#subtitle').text('Guess a number between 1-100!')
        $('.guess').text('-');
        $('#hint, #submit').prop("disabled",false);

    })
})