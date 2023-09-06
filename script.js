/* sperate ui and logic */

/* Module pattern since only one gameBoard(an object) is needed */
const gameBoard = function(doc){
    let gameboard = [
        ["a","b","c"],
        ["d","x","f"],
        ["g","h","o"]
    ]
    
    //we want gameboard to be in the private scope -> returning board is just for viewing purposes
    const board = () => gameboard
    
    return {
        board
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
                console.log(cols[i])
            }
            count++
        })
    }

    return {
        display
    }

}(document);

/* factory function since more then one player is needed */
const Player = function(name){
    const display = function() {
        console.log(name)
    }

    return {
        display
    }
}   



const player1 = Player("player1")
screenController.display()