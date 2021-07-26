<h1>Project-1: Metroid Snake<h1>

<h2>Overview</h2>

<p>For our first GA project, we were asked to create a grid based game, rendered in browser, using JavaScript, CSS and HTML. We had multiple game types to choose from- I decided upon the 90’s classic, Snake. This project was to be created solo, and within 1 week.</p>

<a href="https://tdore92.github.io/project-1/">Play Metroid Snake here</a>

<h2>Brief</h2>

* The snake should be able to eat food to grow bigger.
* The game should end when the snake hits the wall or itself.
* Snake speeds up as it eats more.

<h2>Technologies Used</h2>

<li>HTML5</li>
<li>CSS</li>
<li>JavaScript (ES6)</li>
<li>GitHub</li>
<li>Git</li>
<li>Pixlr</li>
<li>Google Images</li>

<h2>Approach taken</h2>

<p>Before beginning the project I sat down and pseudo-coded out my intial thoughts and logic on how I would develop the game, which included:</p>

<li>The board.</li>
<li>How to control the snake.</li>
<li>How the pellet would function.</li>
<li>How to add segments to the snake.</li>
<li>How the score & high score would work.</li>
<br/>
<p>Once this was done the TAs checked my code to verify I was on the right path and I was free to proceed with the projects.</p>
 
 <h3>The Grid</h3>

 <p>The board itself was a 15x15 grid, made using HTML divs. I used JavaScript to append the divs as children of the grid.</p>

 ```
 for (let index = 0; index < elements.width ** 2; index++) {
  const div = document.createElement('div')
  elements.grid.appendChild(div)
  elements.cells.push(div)
}
 ```

 <h3>Movement</h4>

  <p>Figuring out the logic for the snakes movement was undoubtedly the most difficult element of this project. The snake itself was an array- each index serving as a segment. The solution was to pop the snake index from the array and unshift it with a calculation equal to the keystroke, then re-add the index. A setInterval would repeat this function until the next keydown event.</p>

  ```
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
  ```
 <h3>Collisions</h3>

 <p>If the snake head [0] touched the grids edge or its own body, the game would check the user score against the high score. If the user score was higher, it would replace the previous high score. The game would then be reset by the gameOver function, resetting the snake back to 3 pieces on cells 97, 98 and 99 and the pellet to cell 36.</p>

 ```
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
 ```

 <h4>Growth</h4>

  <p>Should the snake ‘eat’ the pellet, a new index of 1 would be pushed into snakeArray, therefore following the movement logic of the rest of the body.</p>

  ```
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
  ```

 <h4>Pellet</h4>

 <p>The pellet itself consisted of a single number value. Once it had been ‘eaten’, the eatPellet() function was triggered, removing the pellet, adding 100 points to the score, and giving the pellet a Math.random value. A spawn function would add the pellet back in after checking for cells not containing the snake.</p>

 ```
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
 ```
 <p>To finish off, I added the visuals with a couple of Google sourced images and used Pixlr to make my desired snake parts viable. I attempted to give each snake segment its own image, but decided against it with little time remaining, causing me to change my Pokemon theme to a Metroid one. Added in some game specific sounds upon eating the pellet and 'dying', and my first GA project was complete(ish)!</p>

<img src="https://i.imgur.com/WlwChmr.png" alt="metroid snake image"/>

<h3>Wins</h3>

<p>Styling: After finishing the code I had limited time left to style, but I felt what I put together excuded that 8-bit Metroid feel successfully, and- with the help of the audio cues- eating a pellet feels quite satisfying!</p>

<p>Functionality: Each bit of progress I made felt like a real step forward, from moving the snake, to successfully adding a segment, to having the whole snake move as desired.</p>

<h3>Challenges</h3>

<p>Movement: Solving this problem was integral to helping me understand how to approach the other issues, mainly using setIntervals to check the positions of the snake and if/else statements to correct its course if needed. This logic of constant check and response extended to the pellet and whether it was being eaten or not.</p>

<h3>Bugs</h3>

<li>The pellet will sometimes spawn inside the snake, logic fix needed.</li>
<li>The HTML displaying the score will move when the first pellet is eaten.</li>

<h3>Future Features</h3>

 <li>Two player mode.</li>
 <li>Add a setInterval speed increase as the snake eats.</li>
 <li>Endgame functionality- should the player successfully fill the grid with the snake.</li>
 <li>Minor aesthetic changes.</li>

<h3>Lessons Learned</h3>

 <li>While the logic for snake turned out to be fairly simple it was a lesson in getting into that problem solving mindset. Once I had the solution for actual movement the other factors became less daunting to approach.</li>

<li>My planning could have been more concise- with no concrete solution to the main problems at hand I quickly became overwhelmed with the work ahead.</li>