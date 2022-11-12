const gameBoard = (() => {
    let _board = new Array(9);
    const getField = (num) => _board[num];

    const setField = (num, player) => {
        //input the selector here later const domField = 

    };

    const getEmptyTile = () => {
        fields = [];
        for (let i = 0; i < _board.length; i++) {
            const field = _board[i];
            if (field == undefined) {
                fields.push(i);
            };
        };
        return fields;
    };

    const clearField = () => {
        for (let i = 0; i < _board.length; i++) {
            _board[i] = undefined;
        };
    };
    return {getField, setField, getEmptyTile, clearField};
})();



const Player = (symbol)  => {
    let token = symbol;
    const getToken = () => token;
    const setToken = (symbol, active) => {
        token = symbol;
        /*  
            ADD THE SELECTOR FOR CHOOSEING A TILE HERE
        */ 
    }


    return {getToken, setToken};
}; 

const sylas = Player('X');
