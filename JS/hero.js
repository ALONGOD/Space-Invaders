`use strict`
const LASER_SPEED = 80
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
    var laserPos = { i: gHero.pos.i - 1, j: gHero.pos.j }
    gIntervalLaser = setInterval(() => {
        gHero.isShoot = true
        laserPos.i--
        var isAlienHit = gBoard[laserPos.i][laserPos.j].gameObject === ALIEN
        if (isAlienHit || laserPos.i === 0) {
            clearInterval(gIntervalLaser)
            gHero.isShoot = false
            if (isAlienHit) {
                handleAlienHit(laserPos)
                return
            }
        }
        blinkLaser(laserPos)
    }, 100)
}
// renders a LASER at specific cell for short time and removes it
function blinkLaser(pos) {
    updateCell(pos, LASER)
    setTimeout(() => updateCell(pos), 25)
}




// function blowUp() {
//     for (var i = row - 1; i <= row + 1; i++) {
//         for (var j = col - 1; j <= col + 1; j++) {
//           if (i >= 0 && i < matrix.length && j >= 0 && j < matrix[0].length && (i !== row || j !== col)) {
//             neighbors.push(matrix[i][j]);
// }