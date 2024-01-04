`use strict`
const BOARD_SIZE = 14
const ALIEN_ROW_LENGTH = 8
const ALIEN_ROW_COUNT = 3
const HERO = '✡️'
const ALIEN = '👳🏾'
var LASER = '🕎'
const SKY = ''
const CANDY = '🍬'
var gScore = 0
var elH2 = document.querySelector('h2')
elH2.innerText = `score: ${gScore}`
// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}
var gBoard
var gGame = {
    // gBoard:null,
    isOn: false,
    alienCount: 0
}
var gIntervalCandy
// globalThis
// Called when game loads
function init() {
    var elBtn = document.querySelector('.start')
    elBtn.classList.add('hide')
    gAliensTopRowIdx = 1
    gAliensBottomRowIdx = 2
    gBoard = createBoard()
    renderBoard(gBoard)
    // shiftBoardLeft(gBoard, 1, 2)
    // clearInterval(gIntervalAliens)
    gIntervalAliens = setInterval(moveAliens, ALIEN_SPEED)
    gIntervalCandy = setInterval(spaceCandies, 10000)
    // spaceCandies()

    // setTimeout(() => shiftBoardLeft(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx), 1000)

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
    var elSpan = document.querySelector('span')
    elSpan.innerText = 'You won man! hell yeahhh'
    var elGameOver = document.querySelector('.over')
    elGameOver.classList.remove('hide')
    clearInterval(gIntervalAliens)
    clearInterval(gIntervalCandy)
}

function lose() {
    var elSpan = document.querySelector('span')
    elSpan.innerText = 'You lost sorry...'
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
            // console.log(gBoard[i][j])
            if (gBoard[i][j].gameObject !== ALIEN) cells.push({ i, j })
        }
    }
    // console.log(cells)
    // console.log(gBoard)
    var myCell = cells[getRandomInt(0, cells.length)]
    // console.log(myCell)
    updateCell(myCell, CANDY)
    setTimeout(() => updateCell(myCell), 5000)
}
