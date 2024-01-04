`use strict`
gSuperCounter = 0
gIsSuper = false
var LASER_SPEED = 80
var gLaserPos = 1
var gHero = { pos: { i: 12, j: 5 }, isShoot: false }
// creates the hero and place it on board
function createHero(board) {
    board[gHero.pos.i][gHero.pos.j] = createCell(HERO)
}
// Handle game keys
function keyPress(ev) {
    if (ev.key === 'ArrowRight') moveHero(1)
    if (ev.key === 'ArrowLeft') moveHero(-1)
    if (ev.key === ' ') shootHero()
    if (ev.key === 'n') blowUp()
    if (ev.key === 'x') superMode()
}
// Move the hero right (1) or left (-1)
function moveHero(dir) {
    if (gHero.pos.j === BOARD_SIZE - 1 && dir === 1) return
    if (gHero.pos.j === 0 && dir === -1) return
    // delete from DOM and Modal
    updateCell(gHero.pos, null)

    //update in gHero
    gHero.pos.j += dir

    // update new hero position in Dom and Modal
    updateCell(gHero.pos, HERO)


}
// Sets an interval for shutting (blinking) the laser up towards aliens
function shootHero() {
    if (gHero.isShoot) return
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
                // alert('hii')
                // updateCell(gLaserPos)
                updateScore(20)
                gIsAlienFreeze = true
                setTimeout(() => gIsAlienFreeze = false, 5000)

            }
        }
        blinkLaser(gLaserPos)
    }, LASER_SPEED)
}
// renders a LASER at specific cell for short time and removes it
function blinkLaser(pos) {
    updateCell(pos, LASER)
    setTimeout(() => updateCell(pos), 25)
}




function blowUp() {
    if (!gHero.isShoot) return
    // console.log(gLaserPos)
    for (var i = gLaserPos.i - 1; i <= gLaserPos.i + 1; i++) {
        for (var j = gLaserPos.j - 1; j <= gLaserPos.j + 1; j++) {
            // if (i === gLaserPos.i && j === gLaserPos.j) continue
            if (j < 0 || j >= BOARD_SIZE - 1) continue
            if (i < 0 || i >= BOARD_SIZE - 1) continue
            if (gBoard[i][j].gameObject === ALIEN) {
                handleAlienHit({ i: i, j: j })

            }
        }
    }
    clearInterval(gIntervalLaser)
    gHero.isShoot = false
    // console.log('hi')
}


function superMode() {
    if (gSuperCounter > 3) {
        gSuperCounter = 0
        LASER = '🕎'
        LASER_SPEED = 80
        gIsSuper = false
    } else {
        gIsSuper = true
        LASER = '⚡'
        LASER_SPEED = 30

    }

}