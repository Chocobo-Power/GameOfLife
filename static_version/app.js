const boardSize = 40;

// Populate Game Board with random dear or alive cells (40x40 grid)
const frontBoard = document.querySelector("#gameBoard")
const backBoard = []
for (i = 0; i < boardSize; i++) {
    const row = []
    for (j = 0; j < boardSize; j++) {
        const position = [i, j];
        const life = Math.random() > 0.5 ? 1 : 0;
        const cell = document.createElement("div");
        row.push({life: life, cell: cell, position: position});
        frontBoard.appendChild(cell);
    }
    backBoard.push(row)
}

// Turn all dead cells to black
turnDeadCellsToBlack(backBoard);

// setInterval(() => {
//     nextGeneration();
// }, 1000)

function nextGeneration() {

    // Iterate board checking:
    //      Is cell alive or dear?
    //      Count alive neighbours
    //      Define if cell is alive or dead next turn

    // Temporal grid for storing next generation
    const temporalGrid = generateTemporalGrid();

    // Iterate current board
    for (i = 0; i < boardSize; i++) {
        for (j = 0; j < boardSize; j++) {
            
            // Remember if cell is alive or dead
            const isAlive = backBoard[i][j].life

            // Count alive neighbours
            const aliveNeighbours = checkNeighbours(backBoard[i][j], backBoard);
            
            // Save new cell status to Temporal Grid
            if (isAlive == 1) {
                if (aliveNeighbours == 2 || aliveNeighbours == 3) {
                    temporalGrid[i][j] = 1
                } else {
                    temporalGrid[i][j] = 0
                }
            } else {
                if (aliveNeighbours == 3) {
                    temporalGrid[i][j] = 1
                } else {
                    temporalGrid[i][j] = 0
                }
            }

            // Console Logs
            // console.log(isAlive)
            // console.log(aliveNeighbours)
        }
    }
    // console.log(temporalGrid);

    for (i = 0; i < boardSize; i++) {
        for (j = 0; j < boardSize; j++) {
            backBoard[i][j].life = temporalGrid[i][j]
        }
    }

    turnDeadCellsToBlack(backBoard);
}

