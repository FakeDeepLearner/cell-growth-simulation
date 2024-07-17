import Cell from "./cell"

class Board{

    public width: number

    public height: number

    //Initialized indirectly
    private readonly cells: Cell[][]

    private numOfEmptyCells: number

    private _completelyFilled: boolean = false

    constructor(width: number, height:number) {
        this.height = height
        this.width = width
        this.numOfEmptyCells = height * width;
        this.cells = this.initializeCells()

    }


    private initializeCells(): Cell[][]{
        let cells: Cell[][] = []
        for (let i = 0; i < this.height; i++) {
            let row: Cell[] = []
            for (let j = 0; j < this.width; j++) {
                row.push(new Cell())
            }
            cells.push(row)
        }
        return cells
    }

    // Get the adjacent cells of a cell at the specified position,
    // this function assumes that it is being used with a full cell.
    private getAdjacentCellsOf(row: number, column: number): Cell[]{
        let returnedCells: Cell[] = []
        //If we can go up, do so
        if(!(row === 0)){
            returnedCells.push(this.cells[row - 1][column])
        }
        //If we can go down, do so
        if(!(row === this.height - 1)){
            returnedCells.push(this.cells[row + 1][column])
        }
        //If we can go left, do so
        if(!(column === 0)){
            returnedCells.push(this.cells[row][column - 1])
        }
        //If we can go right, do so
        if(!(column === this.width - 1)){
            returnedCells.push(this.cells[row][column + 1])
        }

        return returnedCells
    }

    //Get and mark all adjacent cells of all full cells to be filled at the end of the render loop
    private markAdjacentCells(): void{

        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.cells[i][j].isFilled) {
                    let adjacentCells: Cell[] = this.getAdjacentCellsOf(i, j)
                    adjacentCells.forEach((value) => {
                        value.canBeFilled = true
                    })
                }
            }

        }
    }

    //The reason that the function to fill cells is separate is because otherwise, when we traverse the grid,
    //a cell that was filled would also try to fill its adjacent cells.
    private actuallyFillCells(): Board{
        let newBoard = new Board(this.width, this.height)
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.cells[i][j].canBeFilled || this.cells[i][j].isFilled){
                    newBoard.fillCell(i, j)
                }
            }

        }
        if(newBoard.numOfEmptyCells === 0){
            newBoard.completelyFilled = true
        }

        return newBoard
    }

    private fillCell(x:number, y:number){
        this.cells[x][y].isFilled = true
        this.numOfEmptyCells -= 1
    }

    get completelyFilled(): boolean {
        return this._completelyFilled;
    }

    set completelyFilled(value: boolean){
        this._completelyFilled = value;
    }

    public isCellFilled(x:number, y:number) : boolean{
        return this.cells[x][y].isFilled
    }

    private alternateCellStatus(row: number, column: number) {
        this.cells[row][column].isFilled = !this.cells[row][column].isFilled
        if (this.cells[row][column].isFilled){
            this.numOfEmptyCells -= 1
        }
        else{
            this.numOfEmptyCells += 1
        }
    }

    public newBoardWithChangedCell(row:number, column: number): Board{
        let newBoard = new Board(this.width, this.height)
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if(this.isCellFilled(i, j)){
                    newBoard.fillCell(i, j)
                }
            }

        }
        newBoard.alternateCellStatus(row, column)
        return newBoard
    }

    //Update the board, and return the updated board
    public doRenderLoop(): Board{
        this.markAdjacentCells()
        return this.actuallyFillCells()
    }


}

export default Board