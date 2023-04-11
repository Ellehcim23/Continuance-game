const score = document.getElementById('score');
const lives = document.getElementById('lives');
let timer = document.getElementById('timer');
let secondsLeft = 10;
const instructions = document.getElementById('instructions');
const startButton = document.getElementById('start');
// const hardButton = document.getElementById('hardMode');
const futureSoldier = document.getElementById('soldier');
const bomb = document.getElementById('bomb');
const smlBomb = document.getElementById('small-bomb');
const smlMine = document.getElementById('mine');
console.log(bomb)
const bombTypes = [bomb, smlBomb, smlMine]
let randomIndex = Math.floor(Math.random() * (bombTypes.length - 1));
let randomMine = bombTypes[randomIndex];
const ctx = game.getContext('2d');
let mines = [];
let soldier;
let runGame;
let respawnMines;
let startTimer;
let endGame;
let randomNumber = Math.floor(Math.random() * 35) + 10
console.log(randomNumber);
let numOfMines = randomNumber;

window.addEventListener('DOMContentLoaded', () => {
    soldier = new Soldier(150, 90, futureSoldier, 60, 70);

    for (let i = 0; i < numOfMines; i++) {
        let randomX = Math.floor(Math.random() * (game.width - 25)) && !150;
        let randomY = Math.floor(Math.random() * (game.height - 25)) && !90;

        let randomWidth = Math.floor(Math.random() * 35) + 20;
        let randomHeight = Math.floor(Math.random() * 35) + 20;
        function color() {
            const red = Math.floor(Math.random() * 255);
            const green = Math.floor(Math.random() * 50);

            const blue = Math.floor(Math.random() * 255);
            return `rgb(${red}, ${green}, ${blue})`;
        }
        console.log(numOfMines)

        let randomColor = color();

        // let mine = new Mine(randomX, randomY, randomMine, 25, 25);
        let mine = new Mine(randomX, randomY, randomMine, randomWidth, randomHeight);
        mines.push(mine);
    }
    instructions.addEventListener('click', function () {
        alert('Press "W" or "↑" to move up ' + ' Press "A" or "←" to move left ' + ' Press "S" or "↓" to move down ' + ' Press "D" or "→" to move right')
    })
    startButton.addEventListener('click', function () {

        runGame = setInterval(gameLoop, 40);

        respawnMines = setInterval(() => {
            mines.forEach((mine) => {
                if (!mine.alive) {
                    respawnMine(mine);
                } else {
                    // destroy mines and respawn
                    mine.alive = false;
                    respawnMine(mine);
                }
            });
        }, 1500);

        startTimer = setInterval(() => {
            if (secondsLeft <= 0) {
                clearInterval(startTimer);
                clearInterval(respawnMines);
                stopGame();
                alert('You WIN!!')
                window.location.reload()

            }
            timer.value = secondsLeft;
            timer.textContent = secondsLeft;
            secondsLeft -= 1;
        }, 1000)

        endGame = setTimeout(stopGame, 15000);
    })
});

document.addEventListener('keydown', moveSoldier);

game.setAttribute('height', getComputedStyle(game)['height']);
game.setAttribute('width', getComputedStyle(game)['width']);

class Mine {
    constructor(x, y, image, width, height) {
        this.x = x;
        this.y = y;
        this.image = image
        this.width = width;
        this.height = height;
        this.alive = true;

        this.render = function () {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        };
    }
}

class Soldier {
    constructor(x, y, image, width, height) {
        this.x = x;
        this.y = y;
        this.image = image
        this.width = width;
        this.height = height;
        this.alive = true;

        this.render = function () {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        };
    }
}

function moveSoldier(e) {
    console.log('movement: ', e.key);
    if (e.key === 'w' || e.key === 'ArrowUp') {
        soldier.y - 25 >= 0 ? (soldier.y -= 25) : null;
    } else if (e.key === 's' || e.key === 'ArrowDown') {
        soldier.y + 25 <= game.height - soldier.height ? (soldier.y += 25) : null;
    } else if (e.key === 'a' || e.key === 'ArrowLeft') {
        soldier.x - 25 >= 0 ? (soldier.x -= 25) : null;
    } else if (e.key === 'd' || e.key === 'ArrowRight') {
        soldier.x + 25 <= game.width - soldier.width ? (soldier.x += 25) : null;
    }
}

function spawnMines() {
    mines.forEach((mine) => {
        if (!mine.alive) {
            respawnMine(mine);
        }
    });
}

function respawnMine(mine) {
    let randomX = Math.floor(Math.random() * (game.width - 25));
    let randomY = Math.floor(Math.random() * (game.height - 25));
    mine.x = randomX;
    mine.y = randomY;
    mine.alive = true;
}


function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);
    soldier.render();
    mines.forEach((mine) => {
        if (mine.alive) {
            mine.render();
            if (detectHit(soldier, mine)) {
                mine.alive = false;
                lives.textContent = parseInt(lives.textContent) - 1;
                if (parseInt(lives.textContent) <= 0) {
                    stopGame();
                    alert('You lose!!')
                    window.location.reload();
                }
            }
        }
    });
}

function detectHit(player, mine) {
    let hit =
        player.y + player.height > mine.y + 10 &&
        player.y < mine.y + mine.height + 10 &&
        player.x + player.width > mine.x + 10 &&
        player.x < mine.x + mine.width + 10;
    return hit;
}

function stopGame() {
    clearInterval(runGame);
    clearInterval(respawnMines);
    clearTimeout(endGame);
}