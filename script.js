
const X_class = "x";
const O_class ="o";
let circleTurn;
const cellElements = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")
const winningMsgElement = document.getElementById("winningMsg")
const winningMsg= document.querySelector("[data-winning-msg]")
const restartButton= document.getElementById("restartBtn");
const winningCombinations = [
    [0, 1 ,2],
    [3, 4 ,5],
    [6, 7 ,8],
    [0, 3 ,6],
    [1, 4 ,7],
    [2, 5 ,8],
    [0, 4 ,8],
    [2, 4 , 6]
]

        // RESTART
        restartButton.addEventListener("click",startGame)
// START THE GAME!
startGame();

function startGame(){
    circleTurn=false;
    cellElements.forEach(cell => {
        cell.classList.remove(O_class)
        cell.classList.remove(X_class)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once:true})
    })
    setBoardHoverClass()
    winningMsgElement.classList.remove("show");
}


function handleClick(e){
    

    //  PLACE THE MARK

  const cell =e.target;
    const currentClass= circleTurn? X_class : O_class
    placeMark(cell, currentClass);

    // WINNING

    if(checkWin(currentClass)){
        endGame(false)
       
        }
        else if(isDraw()){
            endGame(true);
    }
    else{
         //SWAP TURNS

   swapTurn();

   //HOVER EFFECT
   setBoardHoverClass();
    }
   
}
function endGame(draw){
    if(draw){
        winningMsg.innerText="Draw!"
    }
    else{
        winningMsg.innerHTML=`${circleTurn ? "X" : "O"} Wins`;
    }
    winningMsgElement.classList.add("show");
}

function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_class) || cell.classList.contains(O_class)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}
function swapTurn(){
    circleTurn=!circleTurn;
}
function setBoardHoverClass(){
    board.classList.remove(O_class);
    board.classList.remove(X_class);

    if(circleTurn){
        board.classList.add(X_class);
    }
    else{
        board.classList.add(O_class);
    }

}

function checkWin(currentClass){
return winningCombinations.some(combination => {
    return combination.every(index =>{
        return cellElements[index].classList.contains(currentClass);

    })
})
}


