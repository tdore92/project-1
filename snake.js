console.log('hello')

const elements = {
  grid: document.querySelector('.grid'),
  width: 15,
  cells: [],
  snakeArray: [],
  score: document.querySelector('#score'),
  highScore: document.querySelector('#high-score'),
  button: document.querySelector('#button'),
}
//let isPlayer = false


for (let index = 0; index < elements.width ** 2; index++) {
  const div = document.createElement('div')
  elements.grid.appendChild(div)
  //div.innerHTML = index
  elements.cells.push(div)
}

//SNAKE

//PUSH SNAKE HEAD AND TAIL TO ARRAY
elements.snakeArray.push(97, 98, 99)
elements.snakeArray.forEach(snakepart => elements.cells[snakepart].classList.add('caterpie-left'))
console.log(elements.snakeArray[0])
//elements.pellet.push(62)
//console.log(elements.pellet[0])


//CHECK MOVEMENT
let moveSnake = null
///CONTROLS//
document.addEventListener('keydown', (event) => {
  const key = event.key

  //move down//
  if (key === 's' && !(elements.snakeArray[0] > (elements.width ** 2) - elements.width - 1) && moveSnake !== 'up') {
    moveSnake = 'down'
    //move left//
  } else if (key === 'a' && !(elements.snakeArray[0] % elements.width === 0) && moveSnake !== 'right') {
    moveSnake = 'left'
    //move right//
  } else if (key === 'd' && !(elements.snakeArray[0] % elements.width === elements.width - 1) && moveSnake !== 'left') {
    moveSnake = 'right'
    //move up//
  } else if (key === 'w' && !(elements.snakeArray[0] < elements.width) && moveSnake !== 'down') {
    moveSnake = 'up'
  } else {
    console.log('pressed wrong button idiot')

  }
})

//update the control variable 
//if control is true
//add snake back in with new direction

const moveInterval = setInterval(() => {
  if (moveSnake === 'left') {
    snakeCrash()
    elements.snakeArray.forEach(snakepart => elements.cells[snakepart].classList.remove('caterpie-left'))
    elements.snakeArray.pop()
    elements.snakeArray.unshift(elements.snakeArray[0] - 1)
    elements.snakeArray.forEach(snakepart => elements.cells[snakepart].classList.add('caterpie-left'))
    eatPellet()
    
  } else if (moveSnake === 'right') {
    snakeCrash()
    elements.snakeArray.forEach(snakepart => elements.cells[snakepart].classList.remove('caterpie-left'))
    elements.snakeArray.pop()
    elements.snakeArray.unshift(elements.snakeArray[0] + 1)
    elements.snakeArray.forEach(snakepart => elements.cells[snakepart].classList.add('caterpie-left'))
    eatPellet()
    
  } else if (moveSnake === 'down') {
    snakeCrash()
    elements.snakeArray.forEach(snakepart => elements.cells[snakepart].classList.remove('caterpie-left'))
    elements.snakeArray.pop()
    elements.snakeArray.unshift(elements.snakeArray[0] + elements.width)
    elements.snakeArray.forEach(snakepart => elements.cells[snakepart].classList.add('caterpie-left'))
    eatPellet()
    
  } else if (moveSnake === 'up') {
    snakeCrash()
    elements.snakeArray.forEach(snakepart => elements.cells[snakepart].classList.remove('caterpie-left'))
    elements.snakeArray.pop()
    elements.snakeArray.unshift(elements.snakeArray[0] - elements.width)
    elements.snakeArray.forEach(snakepart => elements.cells[snakepart].classList.add('caterpie-left'))
    eatPellet()
    
  }

}, 200)



//PELLET FUNCTIONALITY
let pellet = 36
elements.cells[pellet].classList.add('pellet')
let score = 0
let highScore = localStorage.getItem('highScore')
const audioPlayer = document.querySelector('audio')

function eatPellet() {
  if (elements.snakeArray[0] === pellet) {
    elements.cells[pellet].classList.remove('pellet')
    score += 100
    if (score === 500) {
      console.log('You hit 500')
    }
    elements.score.innerHTML = score
    console.log(score)
    audioPlayer.src = 'sounds/pelletEat.wav'
    audioPlayer.play()
    elements.snakeArray.push(1)
    pellet = Math.floor(Math.random() * 224)
    spawnPellet()
  }
}

//SPAWN PELLET FUNCTION
function spawnPellet() {
  for (let i = 0; i < 224; i++) {
    if (elements.cells !== elements.snakeArray) {

      elements.cells[pellet].classList.add('pellet')
    }
  }
}

//IF SNAKES TOUCHES ITSELF/THE WALLS
function snakeCrash() {
  console.log(elements.snakeArray)
  if (elements.snakeArray.some((snakepart, i) => i !== 0 && snakepart === elements.snakeArray[0]) || (elements.snakeArray[0] > (elements.width ** 2) - elements.width - 1) && (moveSnake === 'down') || elements.snakeArray[0] % elements.width === 0 && (moveSnake === 'left') || elements.snakeArray[0] % elements.width === elements.width - 1 && (moveSnake === 'right') || elements.snakeArray[0] < elements.width && (moveSnake === 'up')) {
    audioPlayer.src = 'sounds/snakeCrash-sound.wav'
    audioPlayer.play()
    gameOver()
    if (score > highScore) {
      audioPlayer.src = 'sounds/highscore-theme.wav'
      audioPlayer.play()
      highScore = score
      localStorage.setItem('highScore', highScore)
      elements.highScore.innerHTML = highScore
      alert(`You achieved a new high score of ${highScore}!`)
    }
  }
}

if (!highScore) {
  highScore = 0
}
elements.highScore.innerHTML = highScore




function gameOver() {
  for (let i = 0; i < 224; i++){
    elements.cells[i].classList.remove('caterpie-left')
  }
  elements.snakeArray = [97, 98, 99]
  clearInterval(moveInterval)

}

elements.button.addEventListener('click', () => {
  for (let i = 0; i < 224; i++){
    elements.cells[i].classList.remove('caterpie-left')
    elements.cells[i].classList.remove('pellet')
  }
  pellet = 36
  elements.cells[pellet].classList.add('pellet')
  elements.snakeArray = [97, 98, 99]
  elements.snakeArray.forEach(snakepart => elements.cells[snakepart].classList.add('caterpie-left'))
  score = 0
  clearInterval(moveInterval)
  location.reload()
})

