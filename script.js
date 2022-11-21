//Try Again

const form = document.querySelector("#inputForm");
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
    console.log(data);
    //eventListeners
    addEventListenersToBoard(data);

    let displayTurnText = data.currentPlayer === "X" ? data.player1Name : data.player2Name; 
    adjustDom("displayTurn", `${displayTurnText}'s turn`);
};

const addEventListenersToBoard = (data) => {
    document.querySelectorAll(".tile").forEach((tile) => {
        tile.addEventListener('click', (event) => {
            playMove(event.target, data);
        })
    })
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
        //Hard AI
    }

   
};

const endConditions = (data) => {
//player wins
    if(checkWinner(data)) {
        let winnerName = data.currentPlayer === "X" ? data.player1Name : data.player2Name;
        adjustDom("displayTurn", winnerName + " has won the game!!!");
        data.gameOver = true;
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

const checkWinner = (data) => {
    let result = false;
    winConditions.forEach(condition => {
        if(data.board[condition[0]] === data.board[condition[1]] && 
            data.board[condition[1]] === data.board[condition[2]]
            ) {
            console.log('WINNER');
            data.gameOver = true;
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

    /* if (endConditions(data)) {
        return;
    }; */
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