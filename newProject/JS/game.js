`use strict`
const BOARD_SIZE = 14
const ALIEN_ROW_LENGTH = 8
const ALIEN_ROW_COUNT = 3
const HERO = '&#8516;'
const ALIEN = '&#x1F47D;'
const LASER = '⤊'
const SKY = ''
var gScore = 0
var elH2 = document.querySelector('h2')
elH2.innerText = `score: ${gScore}`
// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}
var gBoard
var gGame = {
    isOn: false,
    alienCount: 0
}
// Called when game loads
function init() {
    gBoard = createBoard()
    renderBoard(gBoard)
    // shiftBoardLeft(gBoard, 1, 2)
    // gIntervalAliens = setInterval(moveAliens(), ALIEN_SPEED)

}

// Create and returns the board with aliens on top, ground at bottom
// use the functions: createCell, createHero, createAliens
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

// Render the board as a <table> to the page
function renderBoard(board) {
    var strHTML = '<table><tbody>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell-${i}-${j}`
            //
            strHTML += `<td class="${className}"
            data-i='${i}' data-j='${j}'>${cell.gameObject || ''}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector('.game')
    elContainer.innerHTML = strHTML
}
// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN}

function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}
// position such as: {i: 2, j: 7}
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
    var elVictory = document.querySelector('.victory')
    elVictory.classList.remove('hide')
}

function lose() {
    var elLose = document.querySelector('.lose')
    elLose.classList.remove('hide')
}

function restart() {
    var elVictory = document.querySelector('.victory')
    elVictory.classList.add('hide')
    gScore = 0
    updateScore(0)
    gGame.alienCount = 0
    init()
}


