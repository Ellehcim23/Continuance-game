const score = document.getElementById('score');
const lives = document.getElementById('lives');
let timer = document.getElementById('timer');
let secondsLeft = 15;
const instructions = document.getElementById('instructions');
const startButton = document.getElementById('start');
const ctx = game.getContext('2d');
let mines = [];
let soldier;
let runGame;
let respawnMines;
let startTimer;
let endGame;
let numOfMines = 15;

window.addEventListener('DOMContentLoaded', () => {
  soldier = new Soldier(150, 90, 'green', 40, 40);

  for (let i = 0; i < numOfMines; i++) {
    let randomX = Math.floor(Math.random() * (game.width - 25));
    let randomY = Math.floor(Math.random() * (game.height - 25));
    function color() {
        const red = Math.floor(Math.random() * 255);
        const green = Math.floor(Math.random() * 50);
        const blue = Math.floor(Math.random() * 255);
        return `rgb(${red}, ${green}, ${blue})`;
    }

    let randomColor = color();

    let mine = new Mine(randomX, randomY, randomColor, 25, 25);
    mines.push(mine);
  }
  instructions.addEventListener('click', function(){
    alert('Press "W" or "↑" to move up '+ ' Press "A" or "←" to move left ' + ' Press "S" or "↓" to move down '+' Press "D" or "→" to move right')})
  startButton.addEventListener('click', function() {
  
  runGame = setInterval(gameLoop, 60);
  
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
  }, 2000);

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
    };
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
    };
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
    player.y + player.height > mine.y &&
    player.y < mine.y + mine.height &&
    player.x + player.width > mine.x &&
    player.x < mine.x + mine.width;
  return hit;
}

function stopGame() {
  clearInterval(runGame);
  clearInterval(respawnMines);
  clearTimeout(endGame);
}