var board;
const player1 = 'O'
const player2 = 'X'
const tie = ''
const combos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
]
var player2Turn = false

const cells = document.querySelectorAll('.cell')
startIt()

function startIt() {
  document.querySelector('.endgame').style.display = 'none'
  document.querySelector('.change').style.display = 'none'

  board = Array.from(Array(9).keys())
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = ''
    cells[i].style.removeProperty('background-color')
    cells[i].addEventListener('click', ifClick)
  }
}

function ifClick(square, player) {
  swapClick()
  if (player2Turn == false) {
    player = player1
    changeText(player2)
  } else {
    player = player2
    changeText(player1)
  }
  if (typeof board[square.target.id] == 'number') {
    board[square.target.id] = player
    document.getElementById(square.target.id).innerText = player
    checkIfWin(board)
  }
}

function swapClick() {
  player2Turn = !player2Turn
}

function changeText(who) {
  document.querySelector('.change').style.display = 'block'
  document.querySelector('.change .text-change').innerText = who + ' is' + ' turn'
}

function checkIfWin(arrBoard) {
  let newP1 = []
  let newP2 = []

  for (let j = 0; j < arrBoard.length; j++) {
    if (arrBoard[j] == 'O') { newP1.push(j) }
    if (arrBoard[j] == 'X') { newP2.push(j) }
  }

  for (let i = 0; i < combos.length; i++) {
    let checkP1 = combos[i].filter(x => newP1.includes(x))
    let checkP2 = combos[i].filter(e => newP2.includes(e))

    if (checkP1.length > 2) {
      gameOver(player1)
    } else if (checkP2.length > 2) {
      gameOver(player2)
    }
  }

  tieGame(arrBoard)
}

function gameOver(whoWon) {
  declareWin(whoWon == player1 ? 'O win' : 'X win')
}

function declareWin(who) {
  document.querySelector(".endgame").style.display = 'block'
  document.querySelector('.endgame .text-winner').innerText = who
}

function tieGame(board) {
  let stack = []

  for (let i = 0; i < board.length; i++) {
    if (typeof board[i] !== 'number') {
      stack += board[i]
    }
  }

  if (stack.length == 9) {
    alert('tie game')
    startIt()
  }
}