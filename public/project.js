
// age in days

function ageInDays(){
var birthYear = prompt("what year were you born?");
var TotalDays = (2019 - birthYear) * 365;
var h1 = document.createElement('h1');
var textAnswer = document.createTextNode('You are ' + TotalDays + ' days old');
h1.setAttribute('id', 'ageInDays');
h1.appendChild(textAnswer);
document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInDays').remove();
}


// generate bow Tye

function generateBowTye() {
    var image = document.createElement('img');
    var div = document.getElementById("flex-cat");
    image.src = "suit.jpg";
    div.appendChild(image);
}


function reset1(){
    document.getElementById('flex-cat').remove();
}

function rpsGame(yourChoice){

    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randInt());
    results = decideWinner(humanChoice, botChoice);
    message = finalMessage(results);
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randInt(){
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number){
    return ["Rock", "bag", "Scissor"][number];
}


function decideWinner(yourChoice, botChoice){
    var rpsDatabase = {
        "Rock" : {"Scissor" : 1, "Rock": 0.5, "bag": 0},
        "bag": {"Rock": 1, "bag": 0.5, "Scissor": 0},
        "Scissor": {"bag": 1, "Scissor": 0.5, "Rock": 0},
    };
    var yourScore = rpsDatabase[yourChoice][botChoice];
    var compScore = rpsDatabase[botChoice][yourChoice];
    return [yourScore, compScore];

}

 function finalMessage([yourScore, compScore]){
     if (yourScore === 0){
         return {'message': "You loss", 'color': "red"};
     }
     else if (yourScore === 0.5){
         return {'message': "You tied", "color": "yellow"};
     } else { return {'message': "You won", "color": "green"};

     }
    }

    function rpsFrontEnd(humanImage, botImage, finalMessage){
        var imagesDb = {
            'Rock': document.getElementById('Rock').src,
            'bag': document.getElementById('bag').src,
            'Scissor': document.getElementById('Scissor').src
        }

        document.getElementById('Rock').remove();
        document.getElementById('bag').remove();
        document.getElementById('Scissor').remove();

        var humanDiv = document.createElement("div");
        var botDiv = document.createElement("div");
        var messageDiv = document.createElement("div");

        humanDiv.innerHTML = "<img src=" + imagesDb[humanImage] + " height= 150 width= 150>"
        messageDiv.innerHTML = "<h1 style= color: " + finalMessage['color'] + "; font-size=60px; >" + finalMessage['message'] + "</h1>"
        botDiv.innerHTML = "<img src=" + imagesDb[botImage] + " height= 150 width= 150>"


            document.getElementById('flex-box-rps-div').appendChild(humanDiv);
            document.getElementById('flex-box-rps-div').appendChild(botDiv);
            document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    }

    // Button Colors

      var all_buttons = document.getElementsByTagName("button");

      var copyAllButtons = [];
      for (let i = 0; i < all_buttons.length; i++) {
        copyAllButtons.push(all_buttons[i].classList[1]);
      }
      console.log(copyAllButtons);

      function buttonColors(buttonChange){
          if (buttonChange.value === 'red') {
            buttonsRed();
          }else if (buttonChange.value === 'green'){
            buttonsGreen();
          } else if (buttonChange.value === 'reset'){
            buttonColorReset();
          } else if (buttonChange.value === 'random'){
            randomColors();
          }
      }

      function buttonsRed(){
        for(let i=0; i < all_buttons.length; i++){
          all_buttons[i].classList.remove(all_buttons[i].classList[1]);
          all_buttons[i].classList.add('btn-danger');
        }
      }

      function buttonsGreen(){
        for(let i=0; i < all_buttons.length; i++){
          all_buttons[i].classList.remove(all_buttons[i].classList[1]);
          all_buttons[i].classList.add('btn-success');
        }
      }

      function buttonColorReset(){
        for(let i=0; i < all_buttons.length; i++){
          all_buttons[i].classList.remove(all_buttons[i].classList[1]);
          all_buttons[i].classList.add(copyAllButtons[i]);
        }
      }

      function randomColors() {
        let choices = ["btn-primary", "btn-danger", "btn-success", "btn-warning"]
        for (let i = 0; i < all_buttons.length; i++){
          let randomNumber = Math.floor(Math.random() * 4);
          all_buttons[i].classList.remove(all_buttons[i].classList[1]);
          all_buttons[i].classList.add(choices[randomNumber]);
        }
      }

// alert

let blackjackGame = {
  'you' : {'scoreSpan': '#your-blackjack-result', 'div': '#your-box','score': 0},
  'dealer' : {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box','score': 0},
  'cards' : ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
  'cardsMap': {'2':2,'3':3,'4':4, '5': 5, '6': 6, '7': 7, '8':8,'9':9,'10':10, 'K':10, 'J':10, 'Q':10,'A':[1,11]},
};

const YOU = blackjackGame["you"]
const DEALER = blackjackGame["dealer"]

document.querySelector("#blackjack-hit-button").addEventListener('click', blackjackHit);
document.querySelector("#blackjack-deal-button").addEventListener('click', blackjackDeal);


function blackjackHit(){
  let card = randomCard();
  showCard(card, YOU);
  updateScore(card, YOU);
  showScore(YOU);
}

function showCard(card, activePlayer){
  if (activePlayer['score'] <= 21){
  let cardImage = document.createElement('img');
  cardImage.src = `${card}.png`;
  document.querySelector(activePlayer['div']).appendChild(cardImage);
}
}
function blackjackDeal(){

  let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
  for (i=0; i < yourImages.length; i++){
    yourImages[i].remove();
  }
  for (i=0; i < dealerImages.length; i++){
    dealerImages[i].remove();
}

YOU['score'] = 0;
DEALER['score'] = 0;

document.querySelector('#your-blackjack-result').textContent = 0;
document.querySelector('#dealer-blackjack-result').textContent = 0;
document.querySelector('#your-blackjack-result').style.color = '#ffff';
}

function randomCard(){
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame['cards'][randomIndex];
}


  function updateScore(card, activePlayer){
    // Ace if statement
    if(card === 'A'){
      if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
          activePlayer['score'] += blackjackGame['cardsMap'][card][1];
    } else {
      activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }

  } else {
  activePlayer['score'] += blackjackGame['cardsMap'][card];
}
}
  function showScore(activePlayer){
    if (activePlayer['score'] > 21){
      document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST';
      document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  }}
