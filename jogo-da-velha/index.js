const boardCoordinate = document.querySelectorAll('#board span');
let body = document.querySelector('body');
let board = document.getElementById('board');
let consoleBoard = [];
let turnPlayer = '';

function updateTitle(){
  const playerInput = document.getElementById(turnPlayer);
  document.getElementById('turnPlayer').innerText = playerInput.value;
}

function startGame(){
  const player1 = document.getElementById('player1').value;
  const player2 = document.getElementById('player2').value;

  if(player1 == '' || player2 == ''){
    alert("Digite o nome dos dois jogadores!");
  }

  consoleBoard = [['', '', ''], ['', '', ''], ['', '', '']]
  turnPlayer = 'player1';

  document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>';
  updateTitle();

  boardCoordinate.forEach(function(element){
    element.classList.remove('win');
    element.innerText = '';
    element.classList.add('cursor-pointer');
    element.addEventListener('click', handleBoardClick);
  })
}

function getWinCoordinate(){
  const winCoordinate = [];
  if (consoleBoard[0][0] && consoleBoard[0][0] === consoleBoard[0][1] && consoleBoard[0][0] === consoleBoard[0][2])
    winCoordinate.push("0.0", "0.1", "0.2");
  if (consoleBoard[1][0] && consoleBoard[1][0] === consoleBoard[1][1] && consoleBoard[1][0] === consoleBoard[1][2])
    winCoordinate.push("1.0", "1.1", "1.2");
  if (consoleBoard[2][0] && consoleBoard[2][0] === consoleBoard[2][1] && consoleBoard[2][0] === consoleBoard[2][2])
    winCoordinate.push("2.0", "2.1", "2.2");
  if (consoleBoard[0][0] && consoleBoard[0][0] === consoleBoard[1][0] && consoleBoard[0][0] === consoleBoard[2][0])
    winCoordinate.push("0.0", "1.0", "2.0");
  if (consoleBoard[0][1] && consoleBoard[0][1] === consoleBoard[1][1] && consoleBoard[0][1] === consoleBoard[2][1])
    winCoordinate.push("0.1", "1.1", "2.1");
  if (consoleBoard[0][2] && consoleBoard[0][2] === consoleBoard[1][2] && consoleBoard[0][2] === consoleBoard[2][2])
    winCoordinate.push("0.2", "1.2", "2.2");
  if (consoleBoard[0][0] && consoleBoard[0][0] === consoleBoard[1][1] && consoleBoard[0][0] === consoleBoard[2][2])
    winCoordinate.push("0.0", "1.1", "2.2");
  if (consoleBoard[0][2] && consoleBoard[0][2] === consoleBoard[1][1] && consoleBoard[0][2] === consoleBoard[2][0])
    winCoordinate.push("0.2", "1.1", "2.0");
  return winCoordinate;
}

function disableCoodinate(element){
  element.classList.remove('cursor-poiter');
  element.removeEventListener('click', handleBoardClick);
}

function handleWin(coordinates){
  coordinates.forEach(function(coordinate){
    document.querySelector('[data-coordinate="' + coordinate + '"]').classList.add('win');
  });

  const playerName = document.getElementById(turnPlayer).value;
  document.querySelector('h2').innerHTML = playerName + ' venceu!';
}

function handleBoardClick(ev){
  const span = ev.currentTarget;
  const coordinate = span.dataset.coordinate;
  const rowColumnPair = coordinate.split('.');
  const row = rowColumnPair[0];
  const column = rowColumnPair[1];

  if (turnPlayer === 'player1') {
    span.innerText = 'X';
    consoleBoard[row][column] = 'X';
  }
  else {
    span.innerText = 'O';
    consoleBoard[row][column] = 'O';
  }

  console.clear();
  console.table(consoleBoard);
  disableCoodinate(span);

  const winCoordinates = getWinCoordinate();
  if(winCoordinates.length > 0){
    handleWin(winCoordinates);
  }
  else if(consoleBoard.flat().includes('')){
    turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1';
    updateTitle();
  }
  else {
    document.querySelector('h2').innerHTML = 'Empate!';
  }
}

function changeTheme(){
  let isLight = true;

  if(isLight){
    body.style.backgroundColor = '#2f2e2e';
    body.style.color = "#fff"
    board.style.color = '#2f2e2e';

    isLight = false;
  }
  else {
    body.style.backgroundColor = '#fff';
    body.style.color = "#2f2e2e"
    board.style.color = '#fff';

    isLight = true;
  }

}

document.getElementById('start').addEventListener('click', startGame);
document.getElementById('theme').addEventListener('click', changeTheme);