`use strict`
const ALIEN_SPEED = 1000

// The following two variables represent the part of the matrix (some rows)
// that we should shift (left, right, and bottom)
// We need to update those when:
// (1) shifting down and (2) last alien was cleared from row

var gIsAlienFreeze = false

gAliensTopRowIdx = 1
gAliensBottomRowIdx = 2


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



// לעשות פלוס אחדים ולשנות את אפדייט סל

function shiftBoardDown(board, fromI, toI) {
    for (var i = toI; i > fromI; i--) {
        for (var j = 0; j < board[i].length; j++) {
            updateCell({ i: i, j: j }, board[i - 1][j].gameObject);
        }
    }

    for (var j = 0; j < board[fromI].length; j++) {
        updateCell({ i: fromI, j: j }, null);
    }

    gAliensTopRowIdx++;
    gAliensBottomRowIdx++;
}

// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops
// moveAliens()
// setTimeout(() => moveAliens(), 5000)
// setTimeout(moveAliens, 5000)

function moveAliens() {
    if (gIsAlienFreeze) return

    if (Math.random() > 0.85) shiftBoardDown(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx + 1)

    if (gAliensBottomRowIdx === gHero.pos.i) {
        clearInterval(gIntervalAliens)
        lose()
        return
    }


    if (gBoard[gAliensTopRowIdx][0].gameObject === null && gBoard[gAliensBottomRowIdx][0].gameObject === null && gBoard[gAliensTopRowIdx][BOARD_SIZE - 1].gameObject === null && gBoard[gAliensBottomRowIdx][BOARD_SIZE - 1].gameObject === null) {
        if (Math.random() > 0.5) {
            shiftBoardRight(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
            return
        } else {
            shiftBoardLeft(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
            return
        }
    } else if (gBoard[gAliensTopRowIdx][BOARD_SIZE - 1].gameObject === null && gBoard[gAliensBottomRowIdx][BOARD_SIZE - 1].gameObject === null) {
        shiftBoardRight(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
        return
    } else if (gBoard[gAliensTopRowIdx][0].gameObject === null && gBoard[gAliensTopRowIdx][0].gameObject === null) {
        shiftBoardLeft(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
        return
    }






}
