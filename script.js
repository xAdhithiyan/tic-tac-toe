/* sperate ui and logic */

/* Module pattern since only one gameBoard(an object) is needed */
const gameBoard = function(doc){
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

    const display = function(){
        let count = 1;
        board.forEach(e => {
            let rows = doc.querySelector(`.row-${count}`)
            let cols = rows.children; // a nodeList
            for(let i = 0; i <= 2; i++){
                cols[i].textContent = board[count - 1][i]
            }
            count++
        })
    }

    const winLoseDisplay = function(winner, val){
        const div = document.querySelector(".winlose")

        div.textContent = `The winner is ${winner}(${val})`
    }

    return {
        display,
        winLoseDisplay
    }
}(document);


/* to get the positon of the box that the user clicks and add certain function to it*/
/* the code is repeated but this ensures that the screenController only relies on the gameBoard for the values and not DOM */
const getPostion = function(doc){

    //adding evenListerns to all the individual boxes -> runs one time
    let board = gameBoard.board();
    let count = 1;
    board.forEach(e => {
        let rows = doc.querySelector(`.row-${count}`)
        let cols = rows.children; // a nodeList
        for(let i = 0; i <= 2; i++){
            cols[i].addEventListener("click" , e => {
   
                //when user clicks on a box update the gameboard and display it 
                let row = e.target.parentElement.classList.value.slice(-1) - 1;
                let col = Array.from(e.target.parentElement.children).indexOf(e.target)
                if(!board[row][col]){
                    gameBoard.update(row , col , game.activePlayer().value())
                    screenController.display()
                    game.winLose()

                    // console.log(game.activePlayer().name())
                    game.switchPlayers()
                    // console.log(board)
                }
            })
        }
        count++
    })
}(document);



/* factory function since more then one player is needed */
const Player = function(fname , fvalue){
    const name = () => fname
    const value = () => fvalue
    return {
        name,
        value

    }
}   


/* controls the flow of the game */
const game = function(){
    let board = gameBoard.board()
    const player1 = Player("john" , "o")
    const player2 = Player("Max" , "x")
    let currentPlayer = player2
    
    const switchPlayers = function() {
        currentPlayer = currentPlayer.value() == "x" ?  player1 : player2
    }

    const activePlayer = () => currentPlayer

    const winLose = function(){
        
        let tieCount = 0
        // to check for tie
        board.forEach((e) => {
            e.forEach(box => {
                if (box != ""){
                    tieCount++
                } 
            })
        })
        if(tieCount == 9){
            screenController.winLoseDisplay("no one", "tie")
        }
        for(let i = 0; i < 3; i++){
            if(board[0][i] != 0 && board[1][i] != 0 && board[2][i] != 0 || board[i][0] != 0 && board[i][1] != 0 && board[i][2] != 0){
                //check for single row and column win
                if(board[0][i] == board[1][i] && board[1][i] == board[2][i] || board[i][0] == board[i][1] && board[i][1] == board[i][2]){
                    screenController.winLoseDisplay(activePlayer().name() , activePlayer().value())
                }
                //checks for diagonal win
                else if(board[0][0] == board[1][1] && board[1][1] == board[2][2] || board[0][2] == board[1][1] && board[1][1] == board[2][0]){
                    screenController.winLoseDisplay(activePlayer().name() , activePlayer().value())
                } 
            }
        }   
        return "lost"
    }

    return{
        switchPlayers,
        activePlayer,
        winLose
    } 

}();

screenController.display()