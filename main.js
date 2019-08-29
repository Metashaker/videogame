//VARIABLEs DEFINITION

//0.- Animation and  canvas
let targetsArr = []
let frames = 0
let interval
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
//1.- Buttons
const startButton = document.querySelector('.start-button')


//2.-Screens
const gameArea = document.querySelector('.background')



//CLASSES

//0.- Characters
class Player1 {
  constructor(img, x, y) {
    this.x = x
    this.y = y
    this.width = 40
    this.height = 40
    this.img = new Image()
    this.img.src = img
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
 moveDown() {
   this.y +=10
 }
 moveUp() {
  this.y -= 10
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
  isTouching(target) {
    return (
      this.x < target.x + target.width &&
      this.x + this.width > target.x &&
      this.y < target.y + target.height &&
      this.y + this.height > target.y
    )
  }
}
//1.- Objects
class Target {
  constructor (img, x, y) {
    this.x = x
    this.y = y
    this.height = 20
    this.width = 20
    this.img = new Image()
    this.img.src = img

  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  //moveTarget() {
  //  x = Math.round(Math.random() * canvas.width - targetLength);
  //  y = Math.round(Math.random() * canvas.height - targetLength)
  //}
  }

const generateTarget = () => {
  target = new Array()
  target[0] = 'assets/pill.png'
  target[1] = 'assets/sick-taco_burned.png'
  target[2] = 'assets/pill.png'

  let x = canvas.width
  let y = canvas.height

  if (frames % 200  === 0 ) {
    let randX = Math.floor((Math.random() * x ) + 5)
    let randY = Math.floor((Math.random() * y ) + 5)
    let randTarget = Math.floor(Math.random() * 2 )
    target.push(new Target(randTarget, randX, randY))
  }

}

let drawTarget = () => {
  targetsArr.forEach(target => {
    target.draw()
  })
}
//Funcion que genere imagen aleatotria, y la posicione en x y y aleatoriamente
const pill = new Target ('assets/pill.png', 200, 500)
const player1 = new Player1('assets/ness-run-right.png',10,100)

//EVENT LISTENERS


document.onkeydown = e => {
  //Map movements
    switch(e.keyCode){
      case 38:
        player1.moveUp()
          break;
      case 40: 
          player1.moveDown()
          break;
    }
  }


//1.- Event 1 changes background, draws screen and Ness, and gives Ness functionality
startButton.addEventListener('click', () => {
  //Change background and appear canvas
  gameArea.style.backgroundImage = 'url(assets/taco_truck_illustration-01_2x.jpg)'
  canvas.style.display = 'block'
  //Disappear start screen elements
  startButton.style.display = 'none'
  document.querySelector('.background > h1').style.display = 'none'
  document.querySelector('.background > h2').style.display = 'none'
  document.querySelector('.background > img').style.display = 'none'
  //Make Ness appear over Ironhack adress and draw map
  player1.draw()
})


//ACTIVATION AND HELPER FUNCTIONS

const startGame = () => {
  interval = setInterval(gameLoop, 30)
 }
 const stopGame = () => {
   clearInterval(interval)
   interval = null
 }
 
 const clearCanvas = () => {
   ctx.clearRect(0,0, canvas.width, canvas.height)
 }

function gameLoop() {
      frames += 1
      startGame()
      clearCanvas()
      player1.draw()
      generateTarget()
      drawTarget()

    //drawObstacles()
    //updateObstacles()
    }

gameLoop()

