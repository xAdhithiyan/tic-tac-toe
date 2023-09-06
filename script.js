/* sperate ui and logic */

/* Module pattern since only one gameBoard(an object) is needed */
const gameBoard = function(doc){
    let gameboard = [
        ["a","b","c"],
        ["d","x","f"],
        ["","",""]
    ]
    
    //we want gameboard to be in the private scope -> returning board is just for viewing purposes
    const board = () => gameboard

    //to update the value
    const update = function(row, col, val = "x"){
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
        console.log("hi")
    }

    return {
        display
    }
}(document);


/* to get the positon of the box that the user clicks */
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
                if(!e.target.textContent){
                    
                    //when user clicks on a box update the gameboard and display it 
                    let rows = e.target.parentElement.classList.value.slice(-1) - 1;
                    let cols = Array.from(e.target.parentElement.children).indexOf(e.target)
                    gameBoard.update(rows , cols)
                    screenController.display()
                }
            })
        }
        count++
    })
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
