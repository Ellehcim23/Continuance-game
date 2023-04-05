const game = document.getElementById('game');
const score = document.getElementById('score');
const lives = document.getElementById('lives');
let timer = document.getElementById('timer'), secondsLeft = 45; 
const instructions = document.getElementById('instructions');
const ctx = game.getContext('2d');
let mine1;
let mine2;
let mine3;
let mine4;
let mine5;
let mine6;
let mine7;
let mine8;
let soldier; 

window.addEventListener('DOMContentLoaded', () => {
    mine1 = new Mine (10, 20, 'slategrey', 25, 25);
    mine2 = new Mine (275, 20, 'slategrey', 25, 25);
    mine3 = new Mine (10, 100, 'slategrey', 25, 25);
    mine4 = new Mine (275, 100, 'slategrey', 25, 25);
    mine5 = new Mine (400, 100, 'slategrey', 25, 25);
    mine6 = new Mine (275, 200, 'slategrey', 25, 25);
    mine7 = new Mine (275, 275, 'slategrey', 25, 25);
    mine8 = new Mine (200, 300, 'slategrey', 25, 25);
    soldier = new Soldier (150, 90, 'green', 40, 40);

    const runGame = setInterval(gameLoop, 50);
    //  mine1.render()
    //  mine2.render()
    //  mine3.render()
    //  mine4.render()
    //  soldier.render(); //These characters will be replaced with sprites or images and placed in gameLoop
    const startTimer = setInterval(
        () => {
        if (secondsLeft <= 0) clearInterval(startTimer)
        timer.value = secondsLeft;
        timer.textContent = secondsLeft;
        secondsLeft -= 1
    }, 1000)
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
    {
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
}

function spawnMines () {
    mine1.alive = false;
    mine2.alive = false;
    mine3.alive = false;
    mine4.alive = false;
    mine5.alive = false;
    mine6.alive = false;
    mine7.alive = false;
    mine8.alive = false;

    setTimeout(function() {
        let randomX = Math.floor(Math.random() * (game.width - 25));
        let randomY = Math.floor(Math.random() * (game.height - 25));
        mine1 = new Mine(randomX, randomY, 'slategrey', 25, 25);
        mine2 = new Mine(randomX, randomY, 'slategrey', 25, 25);
        mine3 = new Mine(randomX, randomY, 'slategrey', 25, 25);
        mine4 = new Mine(randomX, randomY, 'slategrey', 25, 25);
        mine5 = new Mine(randomX, randomY, 'slategrey', 25, 25);
        mine6 = new Mine(randomX, randomY, 'slategrey', 25, 25);
        mine7 = new Mine(randomX, randomY, 'slategrey', 25, 25);
        mine8 = new Mine(randomX, randomY, 'slategrey', 25, 25);
    }, 750)
}

function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);
    if (mine1.alive) {
        mine1.render();
        let mine1Hit = detectHit(soldier,mine1);
    }
    if (mine2.alive) {
        mine2.render();
        let mine2Hit = detectHit(soldier,mine2);
    }
    if (mine3.alive) {
        mine3.render();
        let mine3Hit = detectHit(soldier,mine3);
    }
    if (mine4.alive) {
        mine4.render();
        let mine4Hit = detectHit(soldier,mine4);
    }
    if (mine5.alive) {
        mine5.render();
        let mine5Hit = detectHit(soldier,mine5);
    }
    if (mine6.alive) {
        mine6.render();
        let mine6Hit = detectHit(soldier,mine6);
    }
    if (mine7.alive) {
        mine7.render();
        let mine7Hit = detectHit(soldier,mine7);
    }
    if (mine8.alive) {
        mine8.render();
        let mine8Hit = detectHit(soldier,mine8);
    }
 // should possibly check if soldier is alive. then spawn new mines
    soldier.render();
}



function detectHit(player, opponent) {
    let hitTest = (
        player.y + player.height > opponent.y &&
        player.y < opponent.y + opponent.height &&
        player.x + player.width > opponent.x &&
        player.x < opponent.x + opponent.width
    );

    if (hitTest === false) {
        let newScore = Number(score.textContent) + 100;
        score.textContent = newScore;
        return spawnMines();
    } else if (hitTest * 3) {
        soldier.alive = false
        // pop up on screen that game is over and show score
    }
    else {
        return false;
    }
}