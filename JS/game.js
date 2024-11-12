`use strict`
const BOARD_SIZE = 13
const ALIEN_ROW_LENGTH = 8
const ALIEN_ROW_COUNT = 3
const HERO = '&#x1F680;'
const ALIEN = '&#128125;'
var LASER = '&#9757;'
const SKY = ''
const CANDY = '🍬'
var gScore = 0
var elH2 = document.querySelector('h2')
elH2.innerText = `score: ${gScore}`




var gIntervalCandy
var gBoard
var gGame = {
    isOn: false,
    alienCount: 0
}

function init() {
    var elBtn = document.querySelector('.start')
    elBtn.classList.add('hide')
    gAliensTopRowIdx = 1
    gAliensBottomRowIdx = 2
    gBoard = createBoard()
    renderBoard(gBoard)
    gIntervalAliens = setInterval(moveAliens, ALIEN_SPEED)
    gIntervalCandy = setInterval(spaceCandies, 10000)


}


function createBoard() {
    var board = []
    for (var i = 0; i < BOARD_SIZE; i++) {
        board[i] = []
        for (var j = 0; j < BOARD_SIZE; j++) {
            board[i][j] = createCell()
        }
    }

    createAliens(board)
    createHero(board)
    return board
}


function renderBoard(board) {
    var strHTML = '<table><tbody>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell-${i}-${j}`
            //
            strHTML += `<td onclick="killAlien(this)" class="${className}"
            data-i='${i}' data-j='${j}'>${cell.gameObject || ''}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector('.game')
    elContainer.innerHTML = strHTML
}


function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}

function updateCell(pos, gameObject = null) {
    gBoard[pos.i][pos.j].gameObject = gameObject
    var elCell = getElCell(pos)
    elCell.innerHTML = gameObject || ''
}


function updateScore(num) {
    gScore += num
    var elH2 = document.querySelector('h2')
    elH2.innerText = `score: ${gScore}`
}


function Victory() {
    var victorySound = new Audio('audio/win.mp3');
    victorySound.play();

    var elSpan = document.querySelector('span')
    elSpan.innerText = 'You won! yeahhh'
    var elGameOver = document.querySelector('.over')
    elGameOver.classList.remove('hide')
    clearInterval(gIntervalAliens)
    clearInterval(gIntervalCandy)
}

function lose() {
    var losingSound = new Audio('audio/lose.mp3');
    losingSound.play();

    var elSpan = document.querySelector('span')
    elSpan.innerText = 'You lost...'
    var elGameOver = document.querySelector('.over')
    elGameOver.classList.remove('hide')
    clearInterval(gIntervalAliens)
    clearInterval(gIntervalCandy)
}

function restart() {
    var elGameOver = document.querySelector('.over')
    elGameOver.classList.add('hide')
    gScore = 0
    updateScore(0)
    gGame.alienCount = 0
    init()
}
function spaceCandies() {
    var cells = []
    for (var i = 11; i <= 11; i++) {
        for (var j = 0; j < BOARD_SIZE; j++) {
            if (gBoard[i][j].gameObject !== ALIEN) cells.push({ i, j })
        }
    }
    var myCell = cells[getRandomInt(0, cells.length)]
    updateCell(myCell, CANDY)
    setTimeout(() => updateCell(myCell), 5000)
}


function killAlien(elCell) {
    var i = parseInt(elCell.dataset.i)
    var j = parseInt(elCell.dataset.j)

    if (gBoard[i][j].gameObject === ALIEN) {
        handleAlienHit({ i: i, j: j })
    }
    if (gBoard[i + 1][j].gameObject === ALIEN) {
        handleAlienHit({ i: i + 1, j: j })
    }
    if (gBoard[i - 1][j].gameObject === ALIEN) {
        handleAlienHit({ i: i - 1, j: j })
    }
    if (gBoard[i][j + 1].gameObject === ALIEN) {
        handleAlienHit({ i: i, j: j + 1 })
    }
    if (gBoard[i][j - 1].gameObject === ALIEN) {
        handleAlienHit({ i: i, j: j - 1 })
    }

}
