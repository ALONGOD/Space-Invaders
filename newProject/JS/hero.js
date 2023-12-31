`use strict`
const LASER_SPEED = 80
var gHero = { pos: { i: 12, j: 5 }, isShoot: false }
// creates the hero and place it on board
function createHero(board) {
    board[gHero.pos.i][gHero.pos.j] = createCell(HERO)
}
// Handle game keys
function onKeyDown(ev) {
    if (ev.key === 'ArrowRight') moveHero(1)
    if (ev.key === 'ArrowLeft') moveHero(-1)
}
// Move the hero right (1) or left (-1)
function moveHero(dir) {

    // delete from DOM and Modal
    updateCell(gHero.pos, null)

    //update in gHero

    gHero.pos.j += dir

    // update new hero position in Dom and Modal
    updateCell(gHero.pos, HERO)


}
// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() { }
// renders a LASER at specific cell for short time and removes it
function blinkLaser(pos) { }