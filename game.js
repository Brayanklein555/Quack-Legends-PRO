// ===== PWA =====
if ('serviceWorker' in navigator) {
 navigator.serviceWorker.register('sw.js');
}

// ===== PLAYER =====
let player = JSON.parse(localStorage.getItem("save")) || {
 energia:100,
 moedas:100,
 velocidade:2,
 forca:1,
 nivel:1,
 xp:0,
 roupas:[],
 raridade:"comum"
};

function salvar(){
 localStorage.setItem("save", JSON.stringify(player));
}

// ===== CANVAS =====
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 250;

// ===== PERSONAGEM =====
let playerImg = new Image();
playerImg.src = "assets/player.png";

let duck = {
 x:50,
 y:150,
 vy:0,
 gravity:0.5,
 jump:-8
};

// ===== ELEMENTOS =====
let obstaculos = [];
let moedas = [];

// ===== LOOP =====
function loop(){
 ctx.clearRect(0,0,400,250);

 // GRAVIDADE
 duck.vy += duck.gravity;
 duck.y += duck.vy;

 if(duck.y > 150){
  duck.y = 150;
  duck.vy = 0;
 }

 // DESENHAR PLAYER
 ctx.drawImage(playerImg, duck.x, duck.y, 40, 40);

 // OBSTÁCULOS
 obstaculos.forEach(o=>{
  o.x -= 4;
  ctx.fillRect(o.x,150,20,20);

  if(o.x < duck.x+30 && o.x > duck.x){
   alert("Perdeu!");
   location.reload();
  }
 });

 // MOEDAS
 moedas.forEach(m=>{
  m.x -= 4;
  ctx.fillStyle="yellow";
  ctx.fillRect(m.x,100,10,10);

  if(m.x < duck.x+30 && m.x > duck.x){
   player.moedas += 10;
  }
 });

 requestAnimationFrame(loop);
}

// ===== CONTROLE =====
canvas.onclick = () => {
 duck.vy = duck.jump;
};

// ===== SPAWN =====
setInterval(()=>{
 obstaculos.push({x:400});
 moedas.push({x:400});
},2000);

// ===== SISTEMAS =====
function startGame(){
 loop();
}

function treino(){
 player.velocidade += 0.5;
 player.xp += 10;
 salvar();
 alert("Treino completo!");
}

function loja(){
 let escolha = prompt("1-Comum 2-Raro 3-Épico 4-Lendário");

 let precos = [20,80,150,300];

 if(player.moedas >= precos[escolha-1]){
  player.moedas -= precos[escolha-1];
  player.raridade = ["comum","raro","epico","lendario"][escolha-1];
 }

 salvar();
}

function casa(){
 player.energia = 100;
 salvar();
 alert("Descansou!");
}
