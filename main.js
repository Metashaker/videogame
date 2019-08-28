//VARIABLE DEFINITION

//0.- Animation and  canvas
let levels
let frames = 0
let interval
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
//1.- Buttons
const startButton = document.querySelector('.start-button')


//2.-Screens
const gameIntro = document.querySelector('.game-intro')
const map = document.querySelector('.map')



//CLASSES

//0.- Characters
class Player1 {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 40
    this.height = 40
    this.img = new Image()
    this.img.src =
      './assets/ness-run-right.png'
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  mapMovementDown () {
    this.x -= 2.5
    this.y +=8
  }
  mapMovementUp () {
    this.x+=2.5
    this.y -=8
  } 
 moveRight() {
   this.x +=10
 }
 moveLeft() {
  this.x -= 10
}
  top() {
    return this.y
  }
  bottom() {
    return this.y + this.height
  }
  left() {
    return this.x
  }
  right() {
    return this.x + this.width
  }
  moveRight(){
    this.x += 20
  }
  moveLeft(){
    this.x -= 20
  }
  isTouching(obstacle) {
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    )
  }
}


const player1 = new Player1(116,60)
//EVENT LISTENERS
document.onkeydown = e => {
  if (document.querySelector('.screen2').style.display === 'block') {
    switch(e.keyCode){
      case 37:
          player1.mapMovementUp()
          break;
      case 39: 
          player1.mapMovementDown()
          break;
    }
  } else
  switch(e.keyCode){
    case 37:
        player1.moveLeft()
        break;
    case 39: 
        player1.moveRight()
        break;
  }
}

//1.- Event 1 changes background, draws map and Ness, and gives Ness functionality
startButton.addEventListener('click', () => {
  //Change background
  gameIntro.style.backgroundImage = "url(./assets/map.jpg)";
  //Disappear start screen elements
  startButton.style.display = 'none'
  document.querySelector('.game-intro > h1').style.display = 'none'
  document.querySelector('.game-intro > h2').style.display = 'none'
  document.querySelector('.game-intro > img').style.display = 'none'
  //Appear canvas so Ness can move around to pick world
  document.querySelector('.screen2').style.display = 'block'
  //Make Ness appear over Ironhack adress and draw map
  drawScreen2()
  player1.draw()
})

//ACTIVATION AND HELPER FUNCTIONS

const startGame = () => {
  interval = setInterval(updateScreen2, 20)
 }
 const stopGame = () => {
   clearInterval(interval)
   interval = null
 }
 
 const clearCanvas = () => {
   ctx.clearRect(0,0, canvas.width, canvas.height)
 }

const drawScreen2 = () => {
if (document.querySelector('.screen2').style.display === 'block'){
  //dibujar cuadrado en Ironhack
  ctx.fillStyle = 'red'
  ctx.fillRect(116,65,3,3)
  //dibujar lineas a mundos con sus circulos
  ctx,fillStyle = 'black'
  //Movimiento de Ironhack a el buen pastor
  ctx.moveTo(115,68)
  ctx.lineTo(104, 105)
  ctx.stroke()
  //Movimiento hacia tqueria el gato volador y cuadrado rojo en lugar
  ctx.moveTo(103, 111)
  ctx.lineTo(94, 144)
  ctx.stroke()
  //With the whole map drawn, draw Ness in IronHack location
}
}
function updateScreen2() {
  
    frames += 1
    startGame()
    clearCanvas()
    drawScreen2()
    player1.draw()
    //drawObstacles()
    //updateObstacles()
    }

updateScreen2()