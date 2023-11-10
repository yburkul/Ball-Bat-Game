const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const ball = {
  x: canvas.width /2,
  y: canvas.height / 2,
  radius: 10,
  speedX: 3,
  speedY: 3,
};

const bat = {
  x: canvas.width / 2 - 50,
  y: canvas.height - 20,
  width: 100,
  height: 10,
};

let gameStarted = false;
let score = 0;

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function drawBat() {
  ctx.beginPath();
  ctx.rect(bat.x, bat.y, bat.width, bat.height);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle= "#0095DD";
    ctx.fillText("Score: "+ score,8,20)
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawBat();
  drawBall();
  ball.x += ball.speedX;
  ball.y += ball.speedY;
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.speedX = -ball.speedX;
  }
  if (ball.y - ball.radius < 0) {
    ball.speedY = -ball.speedY;
  }

  if (
    ball.y + ball.radius > bat.y &&
    ball.x > bat.x &&
    ball.x < bat.x + bat.width
  ) {
    ball.speedY = -ball.speedY;
    score++;
  }

  
  if (ball.y + ball.radius > canvas.height) {
    alert("Game Over! Score: " + score);
    resetGame();
  }
  if (gameStarted) {
    requestAnimationFrame(draw);
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    bat.x = relativeX - bat.width / 2;
  }
}
function startGame() {
  gameStarted = true;
  document.getElementById("startButton").style.display = "none";
  draw();
}
function resetGame() {
  gameStarted = false;
  document.getElementById("startButton").style.display = "block";
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  bat.x = canvas.width / 2 - 50;
  score = 0
}
document.getElementById("startButton").addEventListener("click", startGame);
document.addEventListener("mousemove", mouseMoveHandler);
