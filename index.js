let userMove = "";
let compMove = "";
let result = "";
let isautoPlaying = false;
let intervalID;
let isConfirmationShowing = false;
const score = JSON.parse(localStorage.getItem('score')) ||{
    Wins:0,
    Loss:0,
    Ties:0
  };
updateScoreElement();
function computerChoice() {
  let choice = Math.random();

  if (choice >= 0 && choice < 0.333) {
    compMove = "Rock";
  } else if (choice >= 0.333 && choice < 0.666) {
    compMove = "Paper";
  } else if (choice >= 0.666 && choice < 1) {
    compMove = "Scissors";
  }
  
  return compMove;
}
function autoPlay(){
  if (!isautoPlaying){
    intervalID= setInterval (()=>{
    const moveReceived=computerChoice();
    playGame(moveReceived);
  },1000);
  document.querySelector('.js-auto')
    .innerHTML='Stop Playing';
  isautoPlaying=true;
  }
  else{
    document.querySelector('.js-auto')
      .innerHTML='AutoPlay';
    clearInterval(intervalID);
    isautoPlaying=false;
  }
}

  document.querySelector('.js-rock')
    .addEventListener('click', () => {
      playGame('Rock')
    })
  document.querySelector('.js-paper')
    .addEventListener('click', ()=>{
     playGame('Paper')
    })
  document.querySelector('.js-scissors')
    .addEventListener('click', ()=>{
      playGame('Scissors')
    })
  document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r'){
      playGame('Rock')
    }
    else if (event.key==='p'){
      playGame('Paper')
    }
    else if (event.key==='s'){
      playGame('Scissors')
    }
    else if (event.key==='a'){
      autoPlay();
    }
    else if (event.key==='Backspace'){
      showResetConfirmation();
    }
    else if (event.key==='y'&& isConfirmationShowing){
      resetScore();
      localStorage.removeItem('score');
      document.querySelector('.pop-up').innerHTML = '';
    }
    else if (event.key==='n'&& isConfirmationShowing){
      document.querySelector('.pop-up').innerHTML = '';
    }
  })
 
  document.querySelector('.js-auto').addEventListener('click',()=>{
    autoPlay();
  })
  document.querySelector('.js-reset').addEventListener('click',()=>
  {
    document.querySelector('.pop-up')
      showResetConfirmation();
  })
 
  function showResetConfirmation(){
    isConfirmationShowing=true;
    document.querySelector('.pop-up').innerHTML = `
      <p>Are You Sure You want to reset score?<span class="imp">(Press Y/N or press buttons!</span></p>
      <button class="js-yes yes">Yes</button>
      <button class="js-no no">No</button>
    `;
    document.querySelector('.js-yes').addEventListener('click', () => {
      resetScore();
      localStorage.removeItem('score');
      document.querySelector('.pop-up').innerHTML = '';
    });
    document.querySelector('.js-no').addEventListener('click', () => {
      document.querySelector('.pop-up').innerHTML = '';
    });
}
function playGame(moveReceived) {
  userMove = moveReceived;
  compMove = computerChoice();

  if (userMove === 'Rock') {
    if (compMove === 'Paper') {
      result = "Lost";
    } else if (compMove === 'Rock') {
      result = "Tie";
    } else if (compMove === 'Scissors') {
      result = "Won";
    }
  }

  if (userMove === 'Paper') {
    if (compMove === 'Paper') {
      result = "Tie";
    } else if (compMove === 'Rock') {
      result = "Won";
    } else if (compMove === 'Scissors') {
      result = "Lost";
    }
  }

  if (userMove === 'Scissors') {
    if (compMove === 'Paper') {
      result = "Won";
    } else if (compMove === 'Rock') {
      result = "Lost";
    } else if (compMove === 'Scissors') {
      result = "Tie";
    }
  }

  if (result === "Won"){
    score.Wins+=1;
  }
  else if (result === "Lost"){
    score.Loss+=1;
  }
  else{
    score.Ties+=1;
  }
  localStorage.setItem('score', JSON.stringify(score))
  moveResultElement();
  scoreResultElement();
  updateScoreElement();
}
function resetScore(){
  score.Wins =0;
  score.Loss =0;
  score.Ties =0;
  updateScoreElement();
  document.querySelector('.js-move').innerHTML = '';
  document.querySelector('.js-result').innerHTML = '';
}
function updateScoreElement(){
  document.querySelector('.js-score')
  .innerHTML=`<span class='wins'>Wins: ${score.Wins}</span>,<br><br>
  <span class='loss'>Loss: ${score.Loss}</span>,<br><br>
  <span class='ties'> Ties: ${score.Ties}</span>`
}
function scoreResultElement(){
  document.querySelector('.js-result')
    .innerHTML=`You ${result}`
}
function moveResultElement(){
  document.querySelector('.js-move')
    .innerHTML=`You
<img class="move-icon" src="images/${userMove}-emoji.png">
<img class="move-icon" src="images/${compMove}-emoji.png">
Computer`
}