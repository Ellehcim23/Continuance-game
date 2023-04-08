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

let objectCoordinates = [];

window.addEventListener('DOMContentLoaded', () => {
    mine1 = new Mine(10, 20, 'slategrey', 25, 25);
    // mine2 = new Mine(275, 20, 'slategrey', 25, 25);
    // mine3 = new Mine(10, 100, 'slategrey', 25, 25);
    // mine4 = new Mine(275, 100, 'slategrey', 25, 25);
    soldier = new Soldier(150, 90, 'green', 40, 40);

    const runGame = setInterval(gameLoop, 60);
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


    // const endGame = setInterval (clearInterval(runGame),10000);
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
            objectCoordinates.push({ x: this.x, y: this.y, width: this.width, height: this.height });
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

// function spawnMines() {
//     mine1.alive = false;
//     mine2.alive = false;
//     mine3.alive = false;
//     mine4.alive = false;

//     setTimeout(function () {
//         let randomX = Math.floor(Math.random() * (game.width - 25));
//         let randomY = Math.floor(Math.random() * (game.height - 25));
//         mine1 = new Mine(randomX, randomY, 'slategrey', 25, 25);
//         mine2 = new Mine(randomX, randomY, 'slategrey', 25, 25);
//         mine3 = new Mine(randomX, randomY, 'slategrey', 25, 25);
//         mine4 = new Mine(randomX, randomY, 'slategrey', 25, 25);
//     }, 2000)

// }
function spawnMine() {
    // mine1.alive = false;
    setInterval(function () {
        let randomX = Math.floor(Math.random() * (game.width - 25));
        let randomY = Math.floor(Math.random() * (game.height - 25));
        mine1 = new Mine(randomX, randomY, 'slategrey', 25, 25);
    }, 2000)

}
// function spawnMine2() {
//     // mine2.alive = true;
//     setTimeout(function () {
//         let randomX = Math.floor(Math.random() * (game.width - 25));
//         let randomY = Math.floor(Math.random() * (game.height - 25));
//         mine2 = new Mine(randomX, randomY, 'slategrey', 25, 25);
//     }, 1000)

//     return true;

// }

// function gameLoop() {
//     ctx.clearRect(0, 0, game.width, game.height);
//     if (mine1.alive) {
//         mine1.render();
//         let mine1Hit = detectHit(soldier,mine1);
//     }
//     if (mine2.alive) {
//         mine2.render();
//         let mine2Hit = detectHit(soldier,mine2);
//     }
//     if (mine3.alive) {
//         mine3.render();
//         let mine3Hit = detectHit(soldier,mine3);
//     }
//     if (mine4.alive) {
//         mine4.render();
//         let mine4Hit = detectHit(soldier,mine4);
//     }
//  // should possibly check if soldier is alive. then spawn new mines
//     soldier.render();
// }



  
function gameLoop() {
    // ctx.clearRect(0, 0, game.width, game.height);
    if (mine1.alive) {
        mine1.render();
        

        objectCoordinates.forEach(rect => {
            // Draw the rectangle using the stored coordinates
            mine1.alive = false
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
          });
        
        let mine1Hit = detectHit(soldier, mine1);
    }
    soldier.render();
    // should possibly check if soldier is alive. then spawn new mines
    // mine3.render();
    // mine4.render();
}

// if there is a mine alive, keep it in game loop,

function detectHit(player, opponent) {
    let hitTest = (
        player.y + player.height > opponent.y &&
        player.y < opponent.y + opponent.height &&
        player.x + player.width > opponent.x &&
        player.x < opponent.x + opponent.width
    );
    console.log(hitTest)

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
    spawnMine()
    //     // } else {
    //     //         return false;
    //     //     }
    // }
}