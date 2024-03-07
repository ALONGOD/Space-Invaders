`use strict`
gSuperCounter = 0
gIsSuper = false
var LASER_SPEED = 80
var gLaserPos = 1
var gHero = { pos: { i: 12, j: 5 }, isShoot: false }

function createHero(board) {
    board[gHero.pos.i][gHero.pos.j] = createCell(HERO)
}

function keyPress(ev) {
    if (ev.key === 'ArrowRight') moveHero(1)
    if (ev.key === 'ArrowLeft') moveHero(-1)
    if (ev.key === ' ') shootHero()
    if (ev.key === 'n') blowUp()
    if (ev.key === 'x') superMode()
    if (ev.key === 'a') paintBoard()
}


function moveHero(dir) {
    if (gHero.pos.j === BOARD_SIZE - 1 && dir === 1) return
    if (gHero.pos.j === 0 && dir === -1) return

    updateCell(gHero.pos, null)

    gHero.pos.j += dir

    updateCell(gHero.pos, HERO)
}


function shootHero() {

    if (gHero.isShoot) return

    var shootingSound = new Audio('audio/laser.mp3');
    shootingSound.play();

    if (gIsSuper) {
        gSuperCounter++
        superMode()
        console.log(gSuperCounter)
    }
    gLaserPos = { i: gHero.pos.i, j: gHero.pos.j }
    gIntervalLaser = setInterval(() => {
        gHero.isShoot = true
        gLaserPos.i--
        var isAlienHit = gBoard[gLaserPos.i][gLaserPos.j].gameObject === ALIEN
        var isCandyHit = gBoard[gLaserPos.i][gLaserPos.j].gameObject === CANDY
        if (isAlienHit || gLaserPos.i === 0 || isCandyHit) {
            clearInterval(gIntervalLaser)
            gHero.isShoot = false
            if (isAlienHit) {
                handleAlienHit(gLaserPos)
                return
            } else if (isCandyHit) {
                updateScore(20)
                gIsAlienFreeze = true
                setTimeout(() => gIsAlienFreeze = false, 5000)

            }
        }
        blinkLaser(gLaserPos)
    }, LASER_SPEED)
}

function blinkLaser(pos) {
    updateCell(pos, LASER)
    setTimeout(() => updateCell(pos), 25)
}




function blowUp() {

    if (!gHero.isShoot) return

    for (var i = gLaserPos.i - 1; i <= gLaserPos.i + 1; i++) {
        for (var j = gLaserPos.j - 1; j <= gLaserPos.j + 1; j++) {
            if (j < 0 || j >= BOARD_SIZE - 1) continue
            if (i < 0 || i >= BOARD_SIZE - 1) continue
            if (gBoard[i][j].gameObject === ALIEN) {
                handleAlienHit({ i: i, j: j })

            }
        }
    }
    clearInterval(gIntervalLaser)
    gHero.isShoot = false
}


function superMode() {
    if (gSuperCounter > 3) {
        gSuperCounter = 0
        LASER = '&#9757;'
        LASER_SPEED = 80
        gIsSuper = false
    } else {
        gIsSuper = true
        LASER = '⚡'
        LASER_SPEED = 32

    }

}


function paintBoard() {
    for (var i = 0; i < BOARD_SIZE; i++) {
        for (var j = 0; j < BOARD_SIZE; j++) {
            if (i === j || i + j === BOARD_SIZE - 1) {
                const elCell = getElCell({ i: i, j: j })
                elCell.style.backgroundColor = "red"
                setTimeout(() => elCell.style.backgroundColor = 'black', 2000)
                if (gBoard[i][j].gameObject === ALIEN) handleAlienHit({ i: i, j: j })
            }
        }
    }
}