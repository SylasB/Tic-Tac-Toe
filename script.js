//Try Again

const form = document.querySelector("#inputForm");
const resetGameBtn = document.querySelector("#resetBtn");

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
]

form.addEventListener('submit', (event) => {

    event.preventDefault(); 

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
   document.querySelector(".formWrapper").setAttribute("hidden", true);
    startGame(data);

});

const startVariables = (data) => {
    //Game Variables
        data.choice = +data.choice;
        data.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        data.player1 = "X";
        data.player2 = "O";
        data.round = 0;
        data.currentPlayer = "X";
        data.gameOver = false;
};

const startGame = (data) => {
    startVariables(data);
    //eventListeners
    addEventListenersToBoard(data);

    let displayTurnText = data.currentPlayer === "X" ? data.player1Name : data.player2Name; 
    adjustDom("displayTurn", `${displayTurnText}'s turn`);
};

const resetGame = () => {
    document.querySelectorAll(".tile").forEach((tile) => {
        tile.className = "tile";
        tile.textContent = "";
      });
}

const addEventListenersToBoard = (data) => {
    document.querySelectorAll(".tile").forEach((tile) => {
        tile.addEventListener('click', (event) => {
            playMove(event.target, data);
        })
    })
    resetGameBtn.addEventListener("click", () => {
        startGame(data);
        resetGame();
        adjustDom("displayTurn", `${data.player1Name}'s turn`);
      });
};

const playMove = (tile, data) => {
    if(data.gameOver || data.round > 8) {
        return;
    }

    if(data.board[tile.id] === "X" || data.board[tile.id] === "O") {
        return;
    }

    data.board[tile.id] = data.currentPlayer;
    tile.textContent = data.currentPlayer;
    tile.className = data.currentPlayer === "X" ? "tile player1" : "tile player2";

    data.round++;

    if(endConditions(data)) {
        return;
    }

    if(data.choice === 0) {
        changePlayer(data);
    } 
    else if(data.choice === 1) {
        //Easy (Random) AI

        easyAIMove(data);
        data.currentPlayer == "X";
    }
    else if(data.choice === 2) {
        changePlayer(data);
        //Hard AI
        hardAIMove(data);
        
        if(endConditions(data)) {
            return;
        }
        changePlayer(data);
    }
  
};

const endConditions = (data) => {
//player wins
    if(checkWinner(data, data.currentPlayer)) {
        let winnerName = data.currentPlayer === "X" ? data.player1Name : data.player2Name;
        adjustDom("displayTurn", winnerName + " has won the game!!!");
        return true;
    }
//tie
    else if (data.round === 9) {
        adjustDom("displayTurn", "It's a Tie!");
        data.gameOver = true;
        return true;
    };
//not over   
return false
};

const checkWinner = (data, player) => {
    let result = false;
    winConditions.forEach(condition => {
        if(
            data.board[condition[0]] === player && data.board[condition[1]] && 
            data.board[condition[1]] === player && data.board[condition[2]] === player
            ) {
        
            result = true;
        }
    })

    return result;
};

const adjustDom = (className, text) => {
    const elem = document.querySelector(`.${className}`);
    elem.textContent = text;
};

const changePlayer = (data) => {
    data.currentPlayer = data.currentPlayer === "X" ? "O" : "X";

    let displayTurnText = data.currentPlayer === "X" ? data.player1Name : data.player2Name; 
    adjustDom("displayTurn", `${displayTurnText}'s turn`);
};

const easyAIMove = (data) => {
   // changePlayer(data);
    data.round++;
   setTimeout(() => { 
        changePlayer(data);
    let availableSpaces = data.board.filter(
    (space) => space !== "X" && space !== "O"
    );

    let move = 
        availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
    data.board[move] = data.player2;
    let tile = document.getElementById(`${move}`);
    tile.textContent = data.player2;
    tile.className = "tile player2";

      if (endConditions(data)) {
        return;
    }; 

    if (data.round === 9) {
        adjustDom("displayTurn", "It's a Tie!");
        data.gameOver = true;
        return true;
    };
 changePlayer(data);

}, 200);
};

const hardAIMove = (data) => {
    data.round++;
    console.log(data);

    const move = minimax(data, "O").index;
    data.board[move] = data.player2;
    let tile = document.getElementById(`${move}`);
    tile.textContent = data.player2;
    tile.className = "tile player2";

    /*
    if(endConditions(data)) {
        return;
    }
    if(checkWinner(data, data.currentPlayer)) {
        let winnerName = data.currentPlayer === "X" ? data.player1Name : data.player2Name;
        adjustDom("displayTurn", winnerName + " has won the game!!!");
        return true;
    } 
    */

    console.log(move);
    console.log(data);
};

const minimax = (data, player) => {
    let availableSpaces = data.board.filter(
        (space) => space !== "X" && space !== "O"
        );
   
    if (checkWinner(data, data.player1)) {
        return {
            score: -100,
        }
    }
    else if (checkWinner(data, data.player2)) {
        return {
            score: 100,
        }
    }
    else if (availableSpaces.length === 0){
        return {
            score: 0,
        }
    }

    const potentialMoves = [];
    //Checks all available moves
    for(let i = 0; i < availableSpaces.length; i++) {
        let move = {};
        move.index = data.board[availableSpaces[i]]
        data.board[availableSpaces[i]] = player;
        if(player === data.player2) {
            move.score = minimax(data, data.player1).score;
        } 
        else {
            move.score = minimax(data, data.player2).score;
        }
        data.board[availableSpaces[i]] = move.index;
        potentialMoves.push(move);
    }
   let bestMove = 0;

   if(player === data.player2) {
       let bestScore = -10000;
       for(let i = 0; i < potentialMoves.length; i++) {
           if(potentialMoves[i].score > bestScore) {
               bestScore = potentialMoves[i].score;
               bestMove = i;
           }
       }
   }
   else {
       let bestScore = 10000;
       for (let i = 0; i < potentialMoves.length; i++) {
          if (potentialMoves[i].score < bestScore) {
            bestScore = potentialMoves[i].score;
            bestMove = i;
          }
       }
   }
   return potentialMoves[bestMove];
};