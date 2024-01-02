`use strict`
const ALIEN_SPEED = 1000
// The following two variables represent the part of the matrix (some rows)
// that we should shift (left, right, and bottom)
// We need to update those when:
// (1) shifting down and (2) last alien was cleared from row

var gIsAlienFreeze = true

gAliensTopRowIdx = 1
gAliensBottomRowIdx = 2
// var gIntervalAliens = setInterval(moveAliens(), ALIEN_SPEED)
console.log(gBoard)
shiftBoardDown(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)

function createAliens(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (i >= gAliensTopRowIdx && i <= gAliensBottomRowIdx && j < BOARD_SIZE - 1 && j > 0) {
                board[i][j] = createCell(ALIEN);
                gGame.alienCount++;
            }
        }
    }
}
function handleAlienHit(pos) {
    updateCell(pos)
    gGame.alienCount--
    updateScore(10)
    if (gGame.alienCount === 0) Victory()
}

function shiftBoardRight(board, fromI, toI) {
    for (var i = fromI; i <= toI; i++) {
        for (var j = board[i].length - 1; j > 0; j--) {
            updateCell({ i: i, j: j }, board[i][j - 1].gameObject);
        }
        updateCell({ i: i, j: 0 }, null);
    }
}


function shiftBoardLeft(board, fromI, toI) {
    for (var i = fromI; i <= toI; i++) {
        for (var j = 0; j < board[i].length - 1; j++) {
            updateCell({ i: i, j: j }, board[i][j + 1].gameObject);
        }
        updateCell({ i: i, j: board[i].length - 1 }, null);
    }
}
function shiftBoardDown(board, fromI, toI) {
    for (var i = toI; i > fromI; i--) {
        for (var j = 0; j < board[i].length; j++) {
            updateCell({ i: i, j: j }, board[i - 1][j].gameObject);
        }
    }
    for (var j = 0; j < board[fromI].length; j++) {
        updateCell({ i: fromI, j: j }, null);
    }
    gAliensTopRowIdx += 1
    gAliensBottomRowIdx += 1
}

// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops

function moveAliens() {
    if (gIsAlienFreeze) return

    if (gAliensBottomRowIdx === gHero.pos.i) {
        clearInterval(gIntervalAliens)
        lose()
        return
    }

    // if getRandomInt(0,1) > 0.5 ? shiftBoardRight() ? shiftBoardLeft()



}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
