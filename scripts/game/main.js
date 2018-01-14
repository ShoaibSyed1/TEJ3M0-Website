let canvas = document.querySelector('.game_canvas');
ctx = canvas.getContext("2d");

function loop(timestamp) {
    update()
    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);

const TILE = {
    NONE: 0,
    X: 1,
    O: 2
};

let gameData = {
    grid: [
        [TILE.NONE, TILE.NONE, TILE.NONE],
        [TILE.NONE, TILE.NONE, TILE.NONE],
        [TILE.NONE, TILE.NONE, TILE.NONE]
    ],
    turn: TILE.X,
    winner: TILE.NONE,
    winLine: [[0, 0], [0, 0]],
    running: true
};

function update() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 300, 300);
    
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000";

    ctx.beginPath();

    ctx.moveTo(100, 0);
    ctx.lineTo(100, 300);

    ctx.moveTo(200, 0);
    ctx.lineTo(200, 300);

    ctx.moveTo(0, 100);
    ctx.lineTo(300, 100);

    ctx.moveTo(0, 200);
    ctx.lineTo(300, 200);

    ctx.closePath();
    ctx.stroke();

    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            ctx.beginPath();

            if (gameData.grid[y][x] === TILE.X) {
                ctx.moveTo(x * 100, y * 100);
                ctx.lineTo(x * 100 + 100, y * 100 + 100);

                ctx.moveTo(x * 100, y * 100 + 100);
                ctx.lineTo(x * 100 + 100, y * 100);
            } else if (gameData.grid[y][x] === TILE.O) {
                ctx.arc(x * 100 + 50, y * 100 + 50, 50, 0, 2*Math.PI, false);
            }

            ctx.closePath();
            ctx.stroke();
        }
    }

    if (gameData.running == false) {
        ctx.lineWidth = 8;
        ctx.strokeStyle = "#FF1212";
        ctx.beginPath();

        ctx.moveTo(gameData.winLine[0][0] * 100 + 50, gameData.winLine[0][1] * 100 + 50);
        ctx.lineTo(gameData.winLine[1][0] * 100 + 50, gameData.winLine[1][1] * 100 + 50);

        ctx.closePath();
        ctx.stroke();

        let winnerText = "";
        if (gameData.winner === TILE.X) {
            winnerText = "X";
        } else if (gameData.winner === TILE.O) {
            winnerText = "O";
        } else {
            console.log(gameData.winner);
            winnerText = "No one";
        }

        let text = winnerText + " wins!";

        ctx.fillStyle = "#000000";
        ctx.font = '48px serif';

        let textSize = ctx.measureText(text);
        ctx.fillText(text, 150 - (textSize.width / 2), 140);

        let restartText = "Click to Restart";

        let restartTextSize = ctx.measureText(restartText);
        ctx.fillText(restartText, 150 - (restartTextSize.width / 2), 190);
    }
}

function checkWin() {
    for (let y = 0; y < 3; y++) {
        if (gameData.grid[y].filter(tile => tile == TILE.X).length == 3) {
            gameData.winner = TILE.X
            gameData.winLine = [[0, y], [2, y]];
        } else if (gameData.grid[y].filter(tile => tile == TILE.O).length == 3) {
            gameData.winner = TILE.O
            gameData.winLine = [[0, y], [2, y]];
        }
    }

    for (let x = 0; x < 3; x++) {
        if (gameData.grid[0][x] == TILE.X && gameData.grid[1][x] == TILE.X && gameData.grid[2][x] == TILE.X) {
            gameData.winner = TILE.X
            gameData.winLine = [[x, 0], [x, 2]];
        } else if (gameData.grid[0][x] == TILE.O && gameData.grid[1][x] == TILE.O && gameData.grid[2][x] == TILE.O) {
            gameData.winner = TILE.O;
            gameData.winLine = [[x, 0], [x, 2]];
        }
    }

    if (gameData.grid[0][0] == TILE.X && gameData.grid[1][1] == TILE.X && gameData.grid[2][2] == TILE.X) {
        gameData.winner = TILE.X
        gameData.winLine = [[0, 0], [2, 2]];
    } else if (gameData.grid[2][0] == TILE.X && gameData.grid[1][1] == TILE.X && gameData.grid[0][2] == TILE.X) {
        gameData.winner = TILE.X
        gameData.winLine = [[2, 0], [0, 2]];
    } else if (gameData.grid[0][0] == TILE.O && gameData.grid[1][1] == TILE.O && gameData.grid[2][2] == TILE.O) {
        gameData.winner = TILE.O
        gameData.winLine = [[0, 0], [2, 2]];
    } else if (gameData.grid[2][0] == TILE.O && gameData.grid[1][1] == TILE.O && gameData.grid[0][2] == TILE.O) {
        gameData.winner = TILE.O
        gameData.winLine = [[2, 0], [0, 2]];
    }

    if (gameData.winner != TILE.NONE) {
        gameData.running = false;
    }

    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            if (gameData.grid[y][x] === TILE.NONE) {
                return;
            }
        }
    }

    gameData.running = false;
}

canvas.addEventListener('mouseup', (event) => {
    let rect = canvas.getBoundingClientRect();
    pos_x = Math.trunc((event.clientX - rect.left) / 100);
    pos_y = Math.trunc((event.clientY - rect.top) / 100);

    if (gameData.running) {
        if (gameData.turn === TILE.X) {
            if (gameData.grid[pos_y][pos_x] === TILE.NONE) {
                gameData.grid[pos_y][pos_x] = TILE.X;
                gameData.turn = TILE.O
            }
        } else if (gameData.turn === TILE.O) {
            if (gameData.grid[pos_y][pos_x] === TILE.NONE) {
                gameData.grid[pos_y][pos_x] = TILE.O;
                gameData.turn = TILE.X
            }
        }

        checkWin();
    } else {
        gameData = {
            grid: [
                [TILE.NONE, TILE.NONE, TILE.NONE],
                [TILE.NONE, TILE.NONE, TILE.NONE],
                [TILE.NONE, TILE.NONE, TILE.NONE]
            ],
            turn: TILE.X,
            winner: TILE.NONE,
            winLine: [[0, 0], [0, 0]],
            running: true
        };
    }
});