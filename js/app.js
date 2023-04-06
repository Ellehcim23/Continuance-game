const game = document.getElementById('game');
const score = document.getElementById('score');
const lives = document.getElementById('lives');
let timer = document.getElementById('timer'), secondsLeft = 45;
const instructions = document.getElementById('instructions');
const ctx = game.getContext('2d');
let mine1;
let mine2;
// let mine3;
// let mine4;
let soldier;

window.addEventListener('DOMContentLoaded', () => {
    mine1 = new Mine(10, 20, 'slategrey', 25, 25);
    mine2 = new Mine(275, 20, 'slategrey', 25, 25);
    // mine3 = new Mine(10, 100, 'slategrey', 25, 25);
    // mine4 = new Mine(275, 100, 'slategrey', 25, 25);
    soldier = new Soldier(150, 90, 'green', 40, 40);

    const runGame = setInterval(gameLoop, 60);
    const makeMines = setInterval(checkMine, 2000)


    const startTimer = setInterval(
        () => {
            if (secondsLeft <= 0) clearInterval(startTimer)
            timer.value = secondsLeft;
            timer.textContent = secondsLeft;
            secondsLeft -= 1
        }, 1000)


    // const endGame = setInterval (setTimeout(runGame),1000);
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
    mine2 = new Mine(randomX, randomY, 'slategrey', 25, 25);
}

function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);
    soldier.render();
    mine1.alive = true
    mine1.render();
    mine2.alive = true
    mine2.render();
    // mine3.render();
    // mine4.render();
}

function checkMine() {
    if (mine1.alive) {
        mine1.render();
        let mine1Hit = detectHit(soldier, mine1);
    }
    if (mine2.alive) {
        mine2.render();
        let mine2Hit = detectHit(soldier, mine2);
    }
}

// if there is a mine alive, keep it in game loop,

function detectHit(player, opponent) {
    let hitTest = (
        player.y + player.height > opponent.y &&
        player.y < opponent.y + opponent.height &&
        player.x + player.width > opponent.x &&
        player.x < opponent.x + opponent.width
    );

    if (hitTest) {
        let soldierLives = Number(lives.textContent) - 1;
        lives.textContent = soldierLives;
        if (soldierLives === 0) {
            soldier.alive = false
            //     // const endGame = setInterval(clearInterval(runGame), 10000);

        }
        // let finalScore = newScore + 0
        // pop up on screen that game is over and show score
    } else if (hitTest === false) {
        //     let newScore = Number(score.textContent) + 1; // if the timer is 0 set soldier alive to false. 
        //     score.textContent = newScore;
    }
    return spawnMine(), spawnMine2();
   
}