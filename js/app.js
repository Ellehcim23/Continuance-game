const game = document.getElementById('game');
const score = document.getElementById('score');
const lives = document.getElementById('lives');
let timer = document.getElementById('timer');
let secondsLeft = 15;
const instructions = document.getElementById('instructions');
const ctx = game.getContext('2d');
let mine1;
let mine2;
let mine3;
let mine4;
let soldier;

window.addEventListener('DOMContentLoaded', () => {
    mine1 = new Mine(10, 20, 'slategrey', 25, 25);
    mine2 = new Mine(275, 20, 'red', 25, 25);
    mine3 = new Mine(10, 100, 'blue', 25, 25);
    mine4 = new Mine(275, 100, 'yellow', 25, 25);
    soldier = new Soldier(150, 90, 'green', 40, 40);

    const runGame = setInterval(gameLoop, 60);
    const makeMines = setInterval(checkMine, 1000)


    const startTimer = setInterval(
        () => {
            if (secondsLeft <= 0) clearInterval(startTimer)
            timer.value = secondsLeft;
            timer.textContent = secondsLeft;
            secondsLeft -= 1
        }, 1000)
   
   function stopGame() {
    if(secondsLeft === 0){
        clearInterval(runGame);
        clearInterval(makeMines);
    }
   } 
   const endGame = setInterval (stopGame, 15000);
//    let newScore = Number(score.textContent) + 1; 
//    score.textContent = newScore;
})

document.addEventListener('keydown', moveSoldier);

game.setAttribute('height', getComputedStyle(game)['height']);
game.setAttribute('width', getComputedStyle(game)['width']);


class Mine {
    constructor(x, y, color, width, height) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
        this.alive = true;

        this.render = function () {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

class Soldier {
    constructor(x, y, color, width, height) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
        this.alive = true;

        this.render = function () {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

function moveSoldier(e) {
    console.log('movement: ', e.key);
    if (e.key === 'w' || e.key === 'ArrowUp') {
        soldier.y - 20 >= 0 ? (soldier.y -= 20) : null;
    } else if (e.key === 's' || e.key === 'ArrowDown') {
        soldier.y + 20 <= game.height - soldier.height ? (soldier.y += 20) : null;
    } else if (e.key === 'a' || e.key === 'ArrowLeft') {
        soldier.x - 20 >= 0 ? (soldier.x -= 20) : null;
    } else if (e.key === 'd' || e.key === 'ArrowRight') {
        soldier.x + 20 <= game.width - soldier.width ? (soldier.x += 20) : null;
    }

}


function spawnMine() {
    mine1.alive = false;
    // setInterval(function () {
    let randomX = Math.floor(Math.random() * (game.width - 25));
    let randomY = Math.floor(Math.random() * (game.height - 25));
    mine1 = new Mine(randomX, randomY, 'slategrey', 25, 25);
}
function spawnMine2() {
    mine2.alive = false;
    // setInterval(function () {
    let randomX = Math.floor(Math.random() * (game.width - 25));
    let randomY = Math.floor(Math.random() * (game.height - 25));
    mine2 = new Mine(randomX, randomY, 'red', 25, 25);
}
function spawnMine3() {
    mine3.alive = false;
    // setInterval(function () {
    let randomX = Math.floor(Math.random() * (game.width - 25));
    let randomY = Math.floor(Math.random() * (game.height - 25));
    mine3 = new Mine(randomX, randomY, 'blue', 25, 25);
}
function spawnMine4() {
    mine4.alive = false;
    // setInterval(function () {
    let randomX = Math.floor(Math.random() * (game.width - 25));
    let randomY = Math.floor(Math.random() * (game.height - 25));
    mine4 = new Mine(randomX, randomY, 'yellow', 25, 25);
}

function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);
    soldier.render();
    mine1.alive = true
    mine1.render();
    mine2.alive = true
    mine2.render();
    mine3.alive = true
    mine3.render();
    mine4.alive = true
    mine4.render();
    


    // mine3.render();
    // mine4.render();
}

function checkMine() {
    if (mine1.alive || mine2.alive || mine3.alive || mine4.alive) {
        mine1.render();
        mine2.render();
        mine3.render();
        mine4.render();
        setTimeout(detectHit1, 60);
        setTimeout(detectHit2, 60);
        setTimeout(detectHit3, 60);
        setTimeout(detectHit4, 60);
    }
    // if (mine2.alive) {
    //     mine2.render();
    //     let hit2 = detectHit(soldier, mine2);
    // }
    // if (mine3.alive) {
    //     mine3.render();
    //     let hit3 = detectHit(soldier, mine3);
    // }
    // if (mine4.alive) {
    //     mine4.render();
    //     let hit4 = detectHit(soldier, mine4);
    // }
}
// Try to set up check mine per mine.

// if there is a mine alive, keep it in game loop,

function detectHit1() {
    if (soldier.y + soldier.height > mine1.y &&
        soldier.y < mine1.y + mine1.height &&
        soldier.x + soldier.width > mine1.x &&
        soldier.x < mine1.x + mine1.width) {

        let livesRemaining = Number(lives.textContent) - 1;
        lives.textContent = livesRemaining;
        
        //     ctx.clearRect(0, 0, game.width, game.height);
        // }
        // let finalScore = newScore + 0
        // pop up on screen that game is over and show score
    } 
    spawnMine();
    // spawnMine2();
    // spawnMine3();
    // spawnMine4();
}
function detectHit2() {
    if (soldier.y + soldier.height > mine2.y &&
        soldier.y < mine2.y + mine2.height &&
        soldier.x + soldier.width > mine2.x &&
        soldier.x < mine2.x + mine2.width) {

        let livesRemaining = Number(lives.textContent) - 1;
        lives.textContent = livesRemaining;
        // if (livesRemaining == 0) {
        //     ctx.clearRect(0, 0, game.width, game.height);
        // }
        // let finalScore = newScore + 0
        // pop up on screen that game is over and show score
    } 
    // spawnMine();
    spawnMine2();
    // spawnMine3();
    // spawnMine4();
}
function detectHit3() {
    if (soldier.y + soldier.height > mine3.y &&
        soldier.y < mine3.y + mine3.height &&
        soldier.x + soldier.width > mine3.x &&
        soldier.x < mine3.x + mine3.width) {

        let livesRemaining = Number(lives.textContent) - 1;
        lives.textContent = livesRemaining;
        // if (livesRemaining == 0) {
        //     ctx.clearRect(0, 0, game.width, game.height);
        // }
        // let finalScore = newScore + 0
        // pop up on screen that game is over and show score
    } 
    // spawnMine();
    // spawnMine2();
    spawnMine3();
    // spawnMine4();
}

function detectHit4() {
    if (soldier.y + soldier.height > mine4.y &&
        soldier.y < mine4.y + mine4.height &&
        soldier.x + soldier.width > mine4.x &&
        soldier.x < mine4.x + mine4.width) {

        let livesRemaining = Number(lives.textContent) - 1;
        lives.textContent = livesRemaining;
        // if (livesRemaining == 0) {
        //     ctx.clearRect(0, 0, game.width, game.height);
        // }
        // let finalScore = newScore + 0
        // pop up on screen that game is over and show score
    } 
    // spawnMine();
    // spawnMine2();
    // spawnMine3();
    spawnMine4();
}