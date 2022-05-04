# Mobile-App-Snake-Game

****************
CS 402

2 April 2022

Amara Tariq

Jerry Liu

Hannah Jacobson

**************** 

OVERVIEW
------------------------------------------------------------------------------------------
Welcome to Snake! This program contains an application for playing the game 'Snake', as 
well as introduction, description, and leaderboard pages. The game makes use of the React 
Native Game Engine to update the game board and stores the leaderboard scores on a remote 
server.

FEATURES
------------------------------------------------------------------------------------------
* Intro: Landing page. User can select to visit the game description or start the game.
* Description: A simple page containing game instructions and credits.
* Snake: The Game! Use the control buttons to direct the snake, start a new game, or move
        on to the leaderboard. Uses React Native Game Engine to create the game loop.
* Leaderboard: Submit your name and score to the leaderboard. Uses a React Native Modal to
*       prompt the user for their name. Loads and saves the data with a remote URL.

INCLUDED FILES
------------------------------------------------------------------------------------------
* App.js
* Intro.js
* Leaderboard.js
* LeaderRedirect.js
* Snake.js
* SnakeRedirect.js
* constants.js
* package.json
* /components
*     Description.js
*     food.js
*     gameLoop.js
*     head.js
*     tail.js
* README

KNOWN ISSUES
------------------------------------------------------------------------------------------
When playing the game on your phone and not through an expo snack QR code, the snake's 
speed stutters, slowing and quickening at random. This does not render the game unplayable,
but it may impact moments where speedy responsiveness is needed to maneuver the snake.

The leaderboard also functions well through an expo snack QR code, but when it comes to 
submitting a score through the user's phone, the score may not be placed correctly on the
leaderboard. This may be due to how quickly the phone retrieves the data from the remote 
server and resolves the promise conflicting with how quickly the code wants to iterate
through the (empty at the time) list.
