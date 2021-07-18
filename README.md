<h1>Project-1<h1>

<h2>Overview</h2>

<p>For our first GA project, we were asked to create a grid based game, rendered in browser, using JavaScript, CSS and HTML. We had multiple game type to choose from- I decided upon the 90’s classic, Snake. This project was to be created solo.</p>

<h2>Brief</h2>

<li>Create a game of ‘Snake’, where the player guides a snake to consume pellets.</li>
<li>The food/pellet is placed randomly on the grid. When pellet is eaten, it is reassigned to a random square.</li>
<li>The snake grows longer, and becomes faster, with each pellet eaten. If the snake touches either the edge of the grid or itself, the game ends.</li>
<li>Game must be rendered in the browser & deployed online.</li>
<li>Adhere to the KISS (Keep It Simple Stupid) principles.</li>
<li>Design logic for snake movement and the ultimate endgame.</li>

<h2>Technologies Used</h2>

<li>HTML5</li>
<li>CSS</li>
<li>JavaScript (ES6)</li>
<li>GitHub</li>
<li>Git</li>
<li>Pixlr</li>
<li>Google Images</li>

<h2>Approach taken</h2>
 
 <h3>The Grid</h3>



 <h3>Functionality</h3>

 <h4>Movement</h4>

  <p>Figuring out the logic for the snakes movement was undoubtedly the most difficult element of this project. The solution was to- on an event listener- pop() the snake index from the array and unshift() it with a calculation equal to the keystroke, before adding the index back in. A setInterval would, with every pass, repeat this function until the next keydown event.</p>

  

 <p>If the snake head [0] touched the grid edge or its own body, snakeCrash() would check the user score against the localStorage high score through an if/else statement. If the user score was higher, it would replace the previous score and  change the innerHTML of the score tag to match. The game would then be reset by gameOver() triggering a clearInterval, resetting the snakeArray back to 3 pieces on cells 97, 98 and 99 and the pellet to cell 36.</p>

 <h4>Growth</h4>

  <p>The snake itself was an array- each index serving as a segment. Should the snake ‘eat’ the pellet, a new index of 1 would be pushed into snakeArray, therefore following the movement logic of the rest of the body.</p>

 <h4>Pellet</h4>

 <p>The pellet itself consists of a single let variable with a number value, initially 36. Once it had been ‘eaten’, the eatPellet() function is triggered, removing the pellet from the classList, adding 100 points to the score variable (reflected in the score innerHTML) and replacing the initial pellet with a Math.random value. In turn, spawnPellet() adds the now randomly located pellet back into classList after checking for cells not containing the snake.</p>

<h1>Screenshot</h1>

<h3>Future Features</h3>

 <li>Two player mode.</li>
 <li>Bug fixes - the pellet occasionally will spawn within the snake body.</li>
 <li>setInterval speed increase as a difficulty rise.</li>
 <li>Endgame functionality- should the player successfully fill the grid with the snake.</li>

<h3>Lessons Learned</h3>

 <p>While the logic for snake turned out to be fairly simple it was a lesson in getting into that problem solving mindset. Once I had the solution for actual movement the other factors became less daunting to approach.</p>
<br/>
<p>My planning could have been more concise- with no concrete solution to the main problems at hand I quickly became overwhelmed with the work ahead.</p>