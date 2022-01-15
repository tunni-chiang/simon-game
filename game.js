var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var randomChosenColour;

var started = false;
var level = 0;

//start game
$(document).keypress(function(event) {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//detect clicked button
$(".btn").click(function(event) {

  var userChosenColour = $(this).attr('id')
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  console.log(currentLevel);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      console.log("success");
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
  } else {
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
          $("body").removeClass("game-over");
      }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence() {

  userClickedPattern = [];

  //increase Level
  level++;
  $("#level-title").text("Level " + level);

  //make random colour
  var randomNumber = Math.round(Math.random() * 3);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //flash
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  //sound
  playSound(randomChosenColour);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function playSound(name) {
  var audio;
  switch (name) {
    case "blue":
      audio = new Audio('sounds/blue.mp3');
      break;
    case "green":
    audio = new Audio('sounds/green.mp3');
      break;
    case "red":
    audio = new Audio('sounds/red.mp3');
      break;
    case "yellow":
    audio = new Audio('sounds/yellow.mp3');
      break;
    default:
      audio = new Audio('sounds/wrong.mp3');
  }
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
