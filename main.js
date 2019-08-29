//VARIABLEs DEFINITION

//0.- Animation and  canvas
let targets = []
let score = 0
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
moveLeft() {
  this.x -= 10
}
moveRight() {
  this.x += 10
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
  //moveTarget() {
  //  x = Math.round(Math.random() * canvas.width - targetLength);
  //  y = Math.round(Math.random() * canvas.height - targetLength)
  //}
  }


//Funcion que genere imagen aleatotria, y la posicione en x y y aleatoriamente
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
      case 37:
        player1.moveLeft()
        break;
      case 39:
        player1.moveRight()
        break;
    }
  }


//1.- Event 1 changes background, draws screen and Ness, and gives Ness functionality
startButton.addEventListener('click', () => {
  //Change background and appear canvas
  canvas.style.backgroundImage = 'url(assets/taco_truck_illustration-01_2x.jpg)'
  canvas.style.display = 'block'
  //Disappear start screen elements
  startButton.style.display = 'none'
  document.querySelector('.background > h1').style.display = 'none'
  document.querySelector('.background > h2').style.display = 'none'
  document.querySelector('.background > img').style.display = 'none'
  //Make Ness appear over Ironhack adress and draw map
  player1.draw()
  gameLoop()

})


//ACTIVATION AND HELPER FUNCTIONS

const startGame = () => {
  interval = setInterval(gameLoop, 20)
 }
 const stopGame = () => {
   clearInterval(interval)
   interval = null
 }
 
 const clearCanvas = () => {
   ctx.clearRect(0,0, canvas.width, canvas.height)
 }
 const generateTarget = () => {
  const yolo = ['assets/pill.png',
  'assets/sick-taco_burned.png',
  'assets/pill.png']

  let x = canvas.width
  let y = canvas.height

  if (frames % 3000  === 0 ) {
    let randX = Math.floor((Math.random() * x ) + 5)
    let randY = Math.floor((Math.random() * y ) + 5)
    let randTarget = Math.floor(Math.random() * 2 )
    targets.push(new Target(yolo[randTarget], randX, randY))
  }
}

const drawTarget = () => {
  if(targets.length !== 0){targets.forEach(element => {
    element.draw()
  })}
}
const getTarget = () => {
  targets.forEach(( element => {
    if (player1.isTouching(element)) {
      targets.slice(element, 1)
      score += 1
      console.log('hiiiii')
      targets.slice(element, 1)
    }
  }))
}
function drawScore() {

  ctx.fillStyle = 'black'
  ctx.font = '20px Courier'
  ctx.fillText(`Score: ${score}`, 10, 10)
  }



function gameLoop() {
      frames += 1
      startGame()
      clearCanvas()
      player1.draw()
      generateTarget()
      drawTarget()
      getTarget()
      drawScore()

    //drawObstacles()
    //updateObstacles()
    }



