// Beat That Psudo Code
// 2 players is required to play the game
// player 1 will start by rolling 2 dice
// player 1 will select which dice will be his first numeral
// the other dice will automatically be the second numeral
// player 2 will continue by throwing his 2 dice
// player 2 will select which dice will be his first numeral
// the other dice will automatically be the second numeral
// compare the results of player 1 and player 2
// the player with the higher number will be the winner

// GLOBEL VARIABLES
// gamemode, gameProcess and current player (default settings)
var gameMode = 'default';
var autoGen = false;
var gameStart = false;
var gameProcess = 'choose player counts';
var playerCount = 2;
var playersScoreArr = [0, 0];
var playersArr = ['Player 1', 'Player 2'];
var playersNumberArr = ['', '']
var playersDiceRollsArr = [['', ''], ['', '']];
var roundDetails = '';

// index for identifying which player is currently playing
var playerIndex = 0;

// preparing game for number of players
var updatePlayerCount = function () {
  var players = [];
  var playersNum = [];
  var playerDiceRolls = [];
  for (let i = 0; i < playerCount; i++) {
    var playerNum = i + 1;
    players.push(`Player ${playerNum}`);
    playerDiceRolls.push([0,0]);
    playersNum.push(0);
  }
  playersArr = players;
  playersNumberArr = playersNum;
  playersDiceRollsArr = playerDiceRolls;
}

// Scores and Leaderboard
var playerOneScore = 0;
var playerTwoScore = 0;

// player database
var playerOneRolls = ['', ''];
var playerOneNumber = '';
var playerTwoRolls = ['', ''];
var playerTwoNumber = '';

// HELPER FUNCTION
// function to roll a 6-sided dice and return a random number
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  console.log(`this dice roll result: ${diceNumber}`)
  return diceNumber;
}

// HELPER FUNCTION
// function that helps to roll 2 dice and return the results in an array
var twoDiceRolls = function () {
  // defining an array for the dice roll results
  var diceResults = [];

  for (let i = 0; i < 2; i++) {
    // generating a random 6-sided dice result, and adding them to the results array
    var diceNumber = diceRoll();
    diceResults.push(diceNumber);
  }

  return diceResults;
}

// HELPER FUNCTION
// determining the 2 dice roll results for respective player
var gameProcessDiceRoll = function () {
  // generating an array with 2 dice roll results
  var diceRollResults = twoDiceRolls();
  if (!gameStart) {
    gameStart = true;
    playerIndex = 0;
  } else {
    playerIndex += 1;
  }

  playersDiceRollsArr[playerIndex] = diceRollResults
  console.log(`${playersArr[playerIndex]}'s dice rolls are ${diceRollResults}`)
  
  updateSystemText(`${playersArr[playerIndex]}! Please select which dice you want for your first numeral!`);
  updateButtonText(`Submit`);
  updatePlayerBox();
  gameProcess = 'first numeral'

  if (autoGen) {
    return gameProcessFirstNum();
  }
  
  // return system message for the results of the dice rolls
  return `You rolled the following: ${diceRollResults}`
}

// HELPER FUNCTION
// determine the combined number based on user choice of first numeral 
var gameProcessFirstNum = function (playerChoice) {
  // defining which player's dice rolls to use
  var arr = playersDiceRollsArr[playerIndex];

  // combining the numbers
  if (!autoGen) {
    if (playerChoice == 1) {
      var firstNumeral = arr[0];
      var secondNumeral = arr[1];
      var playerNum =  (firstNumeral * 10) + secondNumeral;
    } else if (playerChoice == 2) {
      var firstNumeral = arr[1];
      var secondNumeral = arr[0];
      var playerNum =  (firstNumeral * 10) + secondNumeral;
    } else {
      // input validation
      return `You have entered in invalid input, please choose either the first or second dice as your first numeral (i.e. 1 or 2)`;
    }
    console.log(`${playersArr[playerIndex]}'s combined number is: ${playerNum}`)
  } else if (autoGen && gameMode == 'default') {
    if (arr[0] > arr[1]) {
      var playerNum = (arr[0] * 10) + arr[1];
    } else {
      var playerNum = (arr[1] * 10) + arr[0];
    }
    console.log(`System has automatically generate the best outcome of ${playerNum}`)
  } else if (autoGen && gameMode == 'reverse') {
    if (arr[0] < arr[1]) {
      var playerNum = (arr[0] * 10) + arr[1];
    } else {
      var playerNum = (arr[1] * 10) + arr[0];
    }
    console.log(`System has automatically generate the best outcome of ${playerNum}`)
  }

  
  // return the combined numbers to the respective players
  playersScoreArr[playerIndex] = playersScoreArr[playerIndex] + playerNum;
  playersNumberArr[playerIndex] = playerNum;
  roundDetails = roundDetails + `${playersArr[playerIndex]}: <b>${playersNumberArr[playerIndex]}</b>` + '__'

  if ((playerIndex + 1) < playersArr.length) {
    gameProcess = 'dice roll';

    // update player summary
    updatePlayerBox();

    // update system instructions
    updateSystemText(`${playersArr[playerIndex + 1]}, please roll your dice.`);

    // update button text
    updateButtonText(`Roll dice!`);

    // return system message for the player's chosen value
    if (!autoGen) {
      return `${playersArr[playerIndex]} has selected dice #${playerChoice} as their first numberal!`
    } else {
      return `System has automatically generate the best outcome of ${playersNumberArr[playerIndex]} for ${playersArr[playerIndex]}`
    }
  } else {
    gameProcess = 'summary';

    // update player summary
    updatePlayerBox();

    // update system instructions
    updateSystemText(`The game has ended. Click "Reset" to reset the game`);

    // update button
    updateButtonText(`Reset`)

    // return system message for the player's chosen value and the results of the game
    if (!autoGen) {
      return `${playersArr[playerIndex]} has selected dice #${playerChoice} as their first numberal!\n<b>${gameResults()}</b>`
    } else {
      return `System has automatically generate the best outcome of ${playersNumberArr[playerIndex]} for ${playersArr[playerIndex]}\n<b>${gameResults()}</b>`
    }
  }

  // if (player == 'Player 1') {
  //   // reset game and change to player 2
  //   playerOneNumber = playerNum;
  //   playerOneScore += playerNum;
  //   player = 'Player 2';
  //   gameProcess = 'dice roll';

  //   // update player summary
  //   updatePlayerSummary();

  //   // update system instructions
  //   updateSystemText(`Player 2, please roll your dice.`);

  //   // update button text
  //   updateButtonText(`Roll dice!`);

  //   // return system message for the player's chosen value
  //   if (!autoGen) {
  //     return `Player 1 has selected dice #${playerIndex} as their first numberal!`
  //   } else {
  //     return `System has automatically generate the best outcome of ${playerOneNumber} for Player 1`
  //   }
  // } else if (player == 'Player 2') {
  //   // reset game and change game mode to summary
  //   playerTwoNumber = playerNum;
  //   playerTwoScore += playerNum;
  //   player = 'Player 1';
  //   gameProcess = 'summary';

  //   // update player summary
  //   updatePlayerSummary();

  //   // update system instructions
  //   updateSystemText(`The game has ended. Click "Reset" to reset the game`);

  //   // update button
  //   updateButtonText(`Reset`)

  //   // return system message for the player's chosen value and the results of the game
  //   if (!autoGen) {
  //     return `Player 2 has selected dice #${playerIndex} as their first numberal!\n<b>${gameResults()}</b>`
  //   } else {
  //     return `System has automatically generate the best outcome of ${playerTwoNumber} for Player 2\n<b>${gameResults()}</b>`
  //   }
  // }
}

// HELPER FUINCTION
// determine the winner 
var gameResults = function () {
  var winnerIndex = 0;
  if (gameMode == 'default') {
    for (let i = 1; i < playersNumberArr.length; i++) {
      if (playersNumberArr[i] > playersNumberArr[winnerIndex]) {
        winnerIndex = i;
      }
    }
  } else if (gameMode == 'reverse') {
    for (let i = 1; i < playersNumberArr.length; i++) {
      if (playersNumberArr[i] < playersNumberArr[winnerIndex]) {
        winnerIndex = i;
      }
    }
  }

  let sameCount = 0;
  let drawText = '';
  for (let i = 0; i < playersNumberArr.length; i++) {
    if (playersNumberArr[winnerIndex] == playersNumberArr[i]) {
      sameCount += 1;
      drawText = drawText + `${playersArr[i]}, `
    }
  }
  
  if (sameCount > 1) {
    return `${drawText}Wins!`
  }

  return `${playersArr[winnerIndex]} Wins!`

  // if (gameMode == 'default') {
  //   if (playerOneNumber > playerTwoNumber) {
  //     return `Player 1 Wins!`
  //   } else if (playerOneNumber < playerTwoNumber) {
  //     return  `Player 2 Wins!`
  //   } else {
  //     return `WOW! It's a Draw!`
  //   }
  // } else if (gameMode == 'reverse') {
  //   if (playerOneNumber > playerTwoNumber) {
  //     return `Player 2 Wins!`
  //   } else if (playerOneNumber < playerTwoNumber) {
  //     return  `Player 1 Wins!`
  //   } else {
  //     return `WOW! It's a Draw!`
  //   }
  // }
}

var updatePlayerBox = function () {
  document.getElementById("flex-item-one").innerHTML = `${roundDetails}<br><br><b>${playersArr[playerIndex]}</b><br>Dice #1: ${playersDiceRollsArr[playerIndex][0]}<br>Dice #2: ${playersDiceRollsArr[playerIndex][1]}<br>Combined Number: ${playersNumberArr[playerIndex]}`
}

// HELPER FUNCTION
// reset the game
var gameProcessSummary = function () {
  playerIndex = 0;
  roundDetails = '';
  gameProcess = 'dice roll';
  gameStart = false;
  updatePlayerCount();  
  document.getElementById("myCustomText").innerHTML = `${playersArr[0]}, please roll your dice.`
  document.getElementById("submit-button").innerHTML = `Roll dice!`;
  updatePlayerBox();
  // document.getElementById("flex-item-one").innerHTML = `<b>Player 1!</b>\nDice #1:\nDice #2:\nCombined Number:`
  // document.getElementById("flex-item-two").innerHTML = `<b>Player 2!</b>\nDice #1:\nDice #2:\nCombined Number:`
  return '';
}

// HELPER FUNCTION
// tabulate total scores and update leaderboard
var updateLeaderboard = function () {
  var leaderBoardText = '<b>🏁LEADERBOARD🏁</b>';
  for (let i = 0; i < playersArr.length; i++) {
    leaderBoardText = leaderBoardText + `<br>${playersArr[i]}: ${playersScoreArr[i]}`
  }
  // if (playerOneScore >= playerTwoScore) {
  //   document.getElementById("leader-board").innerHTML = `<b>🏁LEADERBOARD🏁</b>\n1:   Player 1 - ${playerOneScore}\n2:   Player 2 - ${playerTwoScore}`
  // } else {
  //   document.getElementById("leader-board").innerHTML = `<b>🏁LEADERBOARD🏁</b>\n1:   Player 2 - ${playerTwoScore}\n2:   Player 1 - ${playerOneScore}`
  // }
  document.getElementById("leader-board").innerHTML = leaderBoardText;
}

// HELPER FUNCTION
// change settings
var gameProcessSettings = function (lowerCaseInput) {
  if (lowerCaseInput == 'reverse') {
    gameMode = 'reverse'
    updateSettingsInfo();
    return 'GameMode changed to reverse'
  } else if (lowerCaseInput == 'default') {
    gameMode = 'default'
    updateSettingsInfo();
    return 'GameMode changed to default'
  } else if (lowerCaseInput == 'auto-generate' && !gameStart) {
    autoGen = !autoGen
    updateSettingsInfo();
    return `Game Settings auto generation set to ${autoGen}`
  } else if (lowerCaseInput == 'exit') {
    gameProcess = 'dice roll';
    updateSystemText(`Player 1, please roll your dice.`);
    updateButtonText(`Roll dice!`);
    return `Settings saved and returned to game!`
  } else {
    return `Invalid settings, type "help" for more details,`
  }
}

// HELPER FUNCTION
// function to update settings information
var updateSettingsInfo = function () {
  document.getElementById("settingInfo").innerHTML = `<b>GameMode:</b> ${gameMode}
    <br><b>Auto-Generate:</b> ${autoGen}
  `
}

// // HELPER FUNCTION
// // function to help update leaderboard information
// var updateLeaderboard = function () {
//   if (playerOneScore > playerTwoScore) {
//     document.getElementById("leader-board").innerHTML = `<b>🏁LEADERBOARD🏁</b>\n1: Player 1 - ${playerOneScore}\n2: Player 2 - ${playerTwoScore}`;
//   } else {
//     document.getElementById("leader-board").innerHTML = `<b>🏁LEADERBOARD🏁</b>\n1: Player 2 - ${playerTwoScore}\n2: Player 1 - ${playerOneScore}`;
//   }
// }

// HELPER FUNCTION
// function to update player summary
// var updatePlayerSummary = function () {
//   document.getElementById("flex-item-one").innerHTML = `<b>Player 1!</b>\nDice #1: ${playerOneRolls[0]}\nDice #2: ${playerOneRolls[1]}\nCombined Number: ${playerOneNumber}`;
//   document.getElementById("flex-item-two").innerHTML = `<b>Player 2!</b>\nDice #1: ${playerTwoRolls[0]}\nDice #2: ${playerTwoRolls[1]}\nCombined Number: ${playerTwoNumber}`;
// }

// HELPER FUNCTION
// function to update system instructions
var updateSystemText = function (msg) {
  document.getElementById("myCustomText").innerHTML = msg;
}

// HELPER FUNCTION
// function to update button text
var updateButtonText = function (msg) {
  document.getElementById("submit-button").innerHTML = msg;
}

// HELPER FUNCTION
// function to return help details
var helpDetails = function () {
  return `settings - open up settings page to amend game rules;
    <br>default - change game mode to default;
    <br>reverse - change game mode to reverse;
    <br>auto-generate - update game rule to switch auto-generate on/off;
    <br>exit - exit and save game settings;
  `;
}

var gameProcessChooseCount = function (input) {
  var newInput = parseInt(input)
  if (isNaN(newInput)) {
    return 'Please return a valid number of Players'
  } else if (newInput > 11 || newInput < 1) {
    return 'Please return a valid number of Players (no more than 10)'
  } else {
    playerCount = newInput;
    
    playerScores = [];
    for (let i = 0; i < playerCount; i++) {
      playerScores.push(0);
    }
    playersScoreArr = playerScores;

    gameProcess = "dice roll";
    updateSystemText(`${playersArr[playerIndex]}, please roll your dice.`)
    updatePlayerCount();  
    updateButtonText(`Roll dice!`);
    return `You have selected ${newInput} Players!`
  }
}

updateSettingsInfo();
updateLeaderboard();
updatePlayerBox();
updateSystemText(`Please enter the number of players (no more than 10)`);
updateButtonText(`Submit`);

// MAIN FUNCTION
var main = function (input) {

  var myOutputValue = '';

  var lowerCaseInput = input.toLowerCase();
  
  if (gameProcess == 'choose player counts') {
    myOutputValue = gameProcessChooseCount(input);
    return myOutputValue;
  } else if (lowerCaseInput == 'help') {
    return helpDetails();
  }

  // change settings
  if (lowerCaseInput == 'settings' && !gameStart) {
    gameProcess = 'settings';
    updateButtonText(`Submit`);
    updateSystemText(`You are currently in the Game Settings! Type "Exit" to return to game!`)
    return '';
  } else if (lowerCaseInput == 'settings' && gameStart) {
    return `Game has started, you cannot change game setting in a middle of a game!`;
  }
  
  // main game process
  if (gameProcess == 'dice roll') {
    myOutputValue = gameProcessDiceRoll();
  } else if  (gameProcess == 'first numeral' && !autoGen) {
    var playerChoice = input;
    myOutputValue = gameProcessFirstNum(playerChoice);
  } else if (gameProcess == 'summary') {
    myOutputValue = gameProcessSummary();
  } else if (gameProcess == 'settings') {
    myOutputValue = gameProcessSettings(lowerCaseInput)
  }

  updateLeaderboard();

  console.log(playersArr)
  console.log(playersScoreArr)
  console.log(playersNumberArr)
  console.log(playersDiceRollsArr)
  console.log(playerIndex)

  return myOutputValue;
};

console.log(playersArr)
console.log(playersScoreArr)
console.log(playersNumberArr)
console.log(playersDiceRollsArr)
console.log(playerIndex)
