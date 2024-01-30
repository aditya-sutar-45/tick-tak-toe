const boxes = document.querySelectorAll('.box');
const winnerDisplay = document.querySelector('.winningText');
const newGameBtn = document.querySelector('#reset');
const currentTurnDisplay = document.querySelector('#currentTurn');

currentTurnDisplay.innerText = `current turn: X`;
winnerDisplay.innerText = `winner is: .....`;

let turnX = true;
let gameOver = false;
let winner;

let count = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach(box => {
    box.addEventListener('click', ()=>{
        count++;
        if (turnX === true){
            box.innerText = 'X';
            currentTurnDisplay.innerText = 'current turn: 0';
            turnX = false;
        }else {
            box.innerText = 'O';
            currentTurnDisplay.innerText = 'current turn: X';
            turnX = true;
        }
        box.disabled = true;

        CheckWin();
        CheckTie();

    })
});

newGameBtn.addEventListener('click', ()=>{
    gameOver = false;
    turnX = true;
    count = 0;
    currentTurnDisplay.innerText = 'current turn: X';
    winnerDisplay.innerText = `winner is: .....`;
    boxes.forEach(box => {
        box.innerText = '';
        box.disabled = false;
        box.classList.remove('win');
        box.classList.remove('tie');
    });
});

function CheckWin(){
    for (let pattern of winningConditions){
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);

        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        
        if (pos1 != '' && pos2 != '' && pos3 != ''){
            if (pos1 == pos2 && pos2 == pos3){
                gameOver = true;
                winnerDisplay.innerText = `winner is: ${pos1}`;
                for (let box of boxes){
                    box.disabled = true;
                }

                boxes[pattern[0]].classList.add('win');
                boxes[pattern[1]].classList.add('win');
                boxes[pattern[2]].classList.add('win');
            }
        }
    }
}

function CheckTie(){
    if (count === 9 && !gameOver){
        winnerDisplay.innerText = 'ITS A TIE';
        currentTurnDisplay.innerText = 'current turn: .....';
        for (let btn of boxes){
            btn.classList.add('tie');
        }
    }
}
