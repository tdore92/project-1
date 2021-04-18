console.log('hello')

const grid = document.querySelector('.grid')
const width = 15
const cells = []
const snakeBody = []

let harry = 97
let pellet = Math.floor(Math.random() * 224)
let hasPellet = true
let hasHarry = true
let isPlaying = false
let score = 0
console.log(pellet)


for (let index = 0; index < width ** 2; index++) {
  const div = document.createElement('div')
  grid.appendChild(div)
  div.innerHTML = index
  cells.push(div)
}

cells[harry].classList.add('harry')
cells[pellet].classList.add('pellet')

///CONTROLS//
document.addEventListener('keydown', (event) => {
  const key = event.key
  //move down//
  if (key === 's' && !(harry > (width ** 2) - width - 1)) {
    cells[harry].classList.remove('harry')
    harry += width
    cells[harry].classList.add('harry')
    //move left//
  } else if (key === 'a' && !(harry % width === 0)) {
    cells[harry].classList.remove('harry')
    harry -= 1
    cells[harry].classList.add('harry')
    //move right//
  } else if (key === 'd' && !(harry % width === width - 1)) {
    cells[harry].classList.remove('harry')
    harry += 1
    cells[harry].classList.add('harry')
    //move up//
  } else if (key === 'w' && !(harry < width)) {
    cells[harry].classList.remove('harry')
    harry -= width
    cells[harry].classList.add('harry')
  }


})

///SPAWN PELLET FUNCTION//
function spawnPellet() {
  cells[pellet].classList.add('pellet')
  hasPellet = true
}


///IF PELLET IS EATEN//
while (cells[pellet] === cells[harry]) {
  cells[pellet].classList.remove('pellet')
  hasPellet = false
  spawnPellet()
  console.log('eaten')
  score = score + 10
}


//if harry and pellet are on the same cells
//console log that they are

