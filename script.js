/* sperate ui and logic */

/* Module pattern since only one gameBoard(an object) is needed */
const gameBoard = function(){
    let gameboard = [
        ["","",""],
        ["","",""],
        ["","",""]
    ]
    
    //we want gameboard to be in the private scope -> returning board is just for viewing purposes
    const board = () => gameboard

    //to update the value
    const update = function(row, col, val){
        gameboard[row][col] = val
    }
    
    return {
        board,
        update
    }
}();


/* Module pattern just for the ui -> must be updated only based on the gameboard */
const screenController = function(doc){
    let board = gameBoard.board();

    //holds all the divs that make up the tic-tac-toe board
    let allGrids = [[],[],[]]

    //adds all the divs that make up tic-tac-toe to allGrids
    let count = 1;
    board.forEach(e => {
        let rows = doc.querySelector(`.row-${count}`)
        let cols = rows.children; // a nodeList
        for(let i = 0; i <= 2; i++){
            allGrids[count - 1].push(cols[i])

        }
        count++
    })

    const getallGrids = () => allGrids;

    const display = function(){
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                allGrids[i][j].textContent = board[i][j]
            }
        }
    }
    
    const winLoseDisplay = function(result, val){
        const div = document.querySelector(".winlose")
        if(result[3] == "win"){
            div.textContent = `${val.toUpperCase()} wins`
            for(let i = 0; i < 3; i++){
                allGrids[result[i][0]][result[i][1]].classList.add("winColor")
            }
        }else if(result[0] == "tie"){
            div.textContent = "Tie"
        }
    }

    const currentPlayerDisplay = function(){
        const div = document.querySelector(".winlose")
        div.textContent = `${game.activePlayer().value().toUpperCase()}'s turn`
    }

    return {
        getallGrids,
        display,
        winLoseDisplay,
        currentPlayerDisplay
    }
}(document);


//event listener function for the game board boxes
const gameBoardEventListerner = function(e){
    let board = gameBoard.board();
    //when user clicks on a box 
    let row = e.target.parentElement.classList.value.slice(-1) - 1;
    let col = Array.from(e.target.parentElement.children).indexOf(e.target)
    if(!board[row][col]){
        gameBoard.update(row , col , game.activePlayer().value()) //update the gameboard 
        screenController.display() //update the gameboard ui
        game.switchPlayers() //switches the current player
        screenController.currentPlayerDisplay() //displays the next player to play
        if(game.winLose()[3] == "win" || game.winLose()[0] == "tie"){
            game.switchPlayers()
            screenController.winLoseDisplay(game.winLose(), game.activePlayer().value()) //checks for win case and displays the winner
        }
    
        console.log(board)
    }
}



/* to get the positon of the box that the user clicks and add certain function to it*/
/*  ensures that the screenController only relies on the gameBoard for the values and not DOM */
const getPostion = function(){
    let allGrids = screenController.getallGrids();

    //adding evenListerns to all the individual boxes -> runs one time
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            allGrids[i][j].addEventListener("click", gameBoardEventListerner)
        }
    }

    //reset button
    const btn = document.querySelector(".reset")
    btn.addEventListener("click", () => {
        window.location.reload(false);
    })
}();



/* factory function since more then one player is needed */
const Player = function(fvalue){
    const value = () => fvalue
    return {
        value

    }
}   


/* controls the flow of the game */
const game = function(){
    let board = gameBoard.board()
    const player1 = Player("o")
    const player2 = Player("x")
    let currentPlayer = player2
    
    const switchPlayers = function() {
        currentPlayer = currentPlayer.value() == "x" ?  player1 : player2
    }

    const activePlayer = () => currentPlayer

    const winLose = function(){
        let allGrids = screenController.getallGrids();
        let tieCount = 0

        for(let i = 0; i < 3; i++){
            //check for single row and column win
            if(board[0][i] != "" && board[1][i] != "" && board[2][i] != "" || board[i][0] != "" && board[i][1] != "" && board[i][2] != ""){
                if(board[0][i] == board[1][i] && board[1][i] == board[2][i] || board[i][0] == board[i][1] && board[i][1] == board[i][2]){
                    for(let j = 0; j < 3; j++){
                        for(let k = 0; k < 3; k++){
                            allGrids[j][k].removeEventListener("click", gameBoardEventListerner )
                        }
                    }

                    //to return the win condition boxes
                    let ans
                    if(board[0][i] == board[1][i] && board[1][i] == board[2][i]){
                        ans = [`0${i}`, `1${i}`,`2${i}`]                         
                    }else{
                        ans = [`${i}0`, `${i}1`,`${i}2`]   
                    }
                    ans.push("win")
                    return ans
                }
            }
            //checks for diagonal win
            if(board[0][0] != "" && board[1][1] != "" && board[2][2] != "" || board[0][2] != "" && board[0][2] != "" && board[1][1] != "" && board[2][0] != "" ){
                if(board[0][0] == board[1][1] && board[1][1] == board[2][2] || board[0][2] == board[1][1] && board[1][1] == board[2][0]){
                    for(let j = 0; j < 3; j++){
                        for(let k = 0; k < 3; k++){
                            allGrids[j][k].removeEventListener("click", gameBoardEventListerner)
                        }
                    }

                    //to return the win condition boxes
                    let ans
                    if(board[0][0] == board[1][1] && board[1][1] == board[2][2]){
                        ans = ["00", "11", "22"]                         
                    }else{
                        ans = ["02", "11", "20"]   
                    }
                    ans.push("win")
                    return ans
                }
            }
        }
        // to check for tie
        board.forEach((e) => {
            e.forEach(box => {
                if (box != ""){
                    tieCount++
                } 
            })
        })
        if(tieCount == 9){
            return ["tie"]
        }
        return ["lose"]      
    }
    
    return{
        switchPlayers,
        activePlayer,
        winLose,
    } 

}();

screenController.display()