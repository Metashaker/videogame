//VARIABLE DEFINITION

let frames = 0
//1.- BUTTONS
const startButton = document.querySelector('.start-button')

//2.-Screens
const gameIntro = document.querySelector('.game-intro')
const map = document.querySelector('.map')


// CLASSES

class Player {
  constructor (width,height, color, x,y) {
    this.width = width
    this.height= height
    this.color = color
    this.x = x
    this.y = y
    this.speedX = 0
    this.speedY = 0
  }
  
}
//EVENT LISTENERS
const startGame = startButton.addEventListener('click', () => {
  //Change background
  gameIntro.style.backgroundImage = "url(./assets/map.jpg)";
  //Disappear start screen elements
  startButton.style.display = 'none'
  document.querySelector('.game-intro > h1').style.display = 'none'
  document.querySelector('.game-intro > h2').style.display = 'none'
  document.querySelector('.game-intro > img').style.display = 'none'

})
startGame()