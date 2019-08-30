//VARIABLEs DEFINITION

//0.- Animation and  canvas

let targets = []
let score = 5
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
    this.height = 25
    this.width = 25
    this.img = new Image()
    this.img.src = img
    this.lifeTime = 5000
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


const player1 = new Player1('assets/player1.png',10,100)

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
      case 81:
        score = 14;
    }
  }


//1.- Event 1 changes background, draws screen and Ness, and gives Ness functionality
startButton.addEventListener('click', () => {
  //Change background and appear canvas
  canvas.style.backgroundImage = 'url(assets/output-onlinepngtools.png)'
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
   if (score === 10) {
   clearInterval(interval)
   interval = null
   }
 }
 
 const clearCanvas = () => {
   ctx.clearRect(0,0, canvas.width, canvas.height)
 }
 const generateTarget = () => {
   //const good = './assets/pill.png'
   //const bad = './assets/sick-taco_burned.png'
  const yolo = ['assets/good-pill.png', 
  'assets/good-taco.png',
  'assets/bad-tacoo.png',
  'assets/bad-germ.png']

  let x = canvas.width
  let y = canvas.height

  if (frames % 3000  === 0 ) {
    let randX = Math.floor((Math.random() * x ) + 5)
    let randY = Math.floor((Math.random() * y ) + 5)
    let randTarget = Math.floor(Math.random() * 4 )
    targets.push(new Target(yolo[randTarget], randX, randY))
  }
}

const drawTarget = () => {
  if(targets.length !== 0){targets.forEach(element => {
    element.draw()
  })}
}
const collision = () => {
  targets.forEach(( element => {
    let indexOfEl = targets.indexOf(element)
    console.log(element.id)
    if (player1.isTouching(element) && element.img.src === 'assets/good-taco.png') {
      targets.splice(indexOfEl, 1)
      score += 1
    
    }else if (player1.isTouching(element) && element.img.src === 'assets/good-pill.png') {
      targets.splice(indexOfEl, 1)
      score += 2
    }else if (player1.isTouching(element) && element.img.src === 'assets/bad-germ.png') {
      targets.splice(indexOfEl, 1)
      score -= 2
    } else if (player1.isTouching(element) && element.img.src === 'assets/bad-tacoo.png') {
      targets.splice(indexOfEl, 1)
      score -= 1
  }
  }))
}
function drawScore() {

  ctx.fillStyle = 'black'
  ctx.font = '16px Courier'
  ctx.fillText(`Score: ${score}`, 10, 20)
  }

  function winScreen() {
  
    ctx.fillRect(0,0,canvas.width,canvas.height)
    canvas.style.display = 'none'
    gameArea.backgroundColor = 'black'
    document.querySelector('.background > img').style.display = 'block'
    document.querySelector('.background > h1').innerHTML = 'YOU WIN!!'
    document.querySelector('.background > h1').style.fontSize = '10rem'
    document.querySelector('.background > h1').style.padding = '50px 0 0 0'
    document.querySelector('.background > h1').style.display = 'block'
    document.querySelector('.background > h1').style.padding = '50px 0 0 0' 
    document.querySelector('.background > h2').innerHTML = 'Press ctrl + r to play again'
    document.querySelector('.background > h2').style.display = 'block'  
    clearInterval(interval)

}

function youWin() {
    if (score >= 15) {
        return winScreen()
    }
}



function gameLoop() {
      frames += 1
      startGame()
      clearCanvas()
      player1.draw()
      generateTarget()
      drawTarget()
      collision()
      drawScore()
      stopGame()
      youWin()
    }



