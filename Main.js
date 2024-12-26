let currentplayer = "X";
let array = Array(9).fill(null);
let gameover= false;

var turnsound= new Audio();
turnsound.src='ChangeTurn.mp3';
var Victorysound= new Audio();
Victorysound.src='Victory.mp3';
var Drawsound= new Audio();
Drawsound.src='Draw.mp3';

function checkwinner(){
    if(
    (array[0] !== null && array[0] == array[1] && array[1] === array[2]) ||
    (array[3] !== null && array[3] == array[4] && array[4] === array[5]) ||
    (array[6] !== null && array[6] == array[7] && array[7] === array[8]) ||
    (array[0] !== null && array[0] == array[3] && array[3] === array[6]) ||
    (array[1] !== null && array[1] == array[4] && array[4] === array[7]) ||
    (array[2] !== null && array[2] == array[5] && array[5] === array[8]) ||
    (array[0] !== null && array[0] == array[4] && array[4] === array[8]) ||
    (array[2] !== null && array[2] == array[4] && array[4] === array[6])
    ){
        let winnerEmoji = currentplayer === "X" ? "🐼" : "🐰";
        document.getElementById("text").innerText=`WINNER IS ${winnerEmoji}`;
        gameover = true;
        setTimeout(() => {
            Victorysound.play();
        }, 700);
        return;
    }
    if (!array.some((e) => e === null)){
        document.getElementById("text").innerText="Draw";
        gameover = true;
        setTimeout(() => {
            Drawsound.play(); 
        }, 700);
        return;
    }
}

function handleclick(el){
    if (gameover) return;
    const id = Number(el.id);
    if (array[id] !== null) return;
    array[id] = currentplayer;
    if (currentplayer === "X") {
        el.innerHTML = "🐼";
    } else {
        el.innerHTML = "🐰";
    }
    checkwinner();
    if (!gameover) {
        currentplayer = currentplayer === "X" ? "0" : "X";
        document.getElementById("text").innerText = `PLAYER ${currentplayer === "X" ? "1" : "2"}'s TURN`;
    }
    turnsound.play()
}

function resetgame(){
    currentplayer = "X";
    array = Array(9).fill(null);
    gameover = false;
    const boxes= document.querySelectorAll(".smallbox");
    boxes.forEach((e) => (e.innerHTML=""));
    document.getElementById("text").innerText= "LET'S BEGIN";
}

function rule(){
    swal({
        title: "RULES",
        text: `✔ There are two players:
               Player 1 uses "🐼" and Player 2 uses "🐰".

               ✔ Taking Turns:
               Players take turns to place their symbol ("🐼" or "🐰") in one of the empty squares on the grid.

               ✔ Winning the Game:
               The first player to get three of their symbols in a row wins the game. This can happen in three ways:

               Horizontally: Three symbols in a row across a row.

               Vertically: Three symbols in a column.

               Diagonally: Three symbols in a diagonal line (either from top-left to bottom-right or from top-right to bottom-left).

               ✔ Game End:
               Victory: The game ends immediately when one player gets three symbols in a row.
               
               Draw: If all squares are filled and no player has won, the game is a draw (tie).`,
        button: "OK",
      });
}