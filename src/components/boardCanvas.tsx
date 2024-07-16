import React, {useEffect, useRef} from "react";
import Board from "./board";

interface CanvasProperties{
    board: Board
    //The width and height of each cell, in pixels
    canvasCellSize: number

    //The radius of the bacteria that will be drawn
    bacteriaRadius: number

    //The color of the bacteria circles that will be drawn
    bacteriaColor: string

    cellChangeFunction: (row: number , column: number) => void

}

const BoardCanvas: React.FC<CanvasProperties> = ({ board,
                                                     canvasCellSize,
                                                     bacteriaRadius,
                                                     bacteriaColor,
                                                     cellChangeFunction }) => {

    const canvasReference =
        useRef<HTMLCanvasElement>(document.createElement('canvas'))

    //Render the board in a canvas. This is in a useEffect hook because we will update the board in
    // the simulation object and pass it into this canvas
    useEffect(() => {
        const currentCanvas = canvasReference.current
        const canvas2DContext = currentCanvas.getContext("2d")
        //Completely clear the canvas (we will redraw it later)
        canvas2DContext?.clearRect(0, 0, currentCanvas.width, currentCanvas.height)

        //Draw the grid itself first

        for (let i = 0; i < board.height; i++) {
            for (let j = 0; j < board.width; j++) {
                const x_position = j * canvasCellSize
                const y_position = i * canvasCellSize

                //Draw the cells and their borders

                // @ts-ignore
                canvas2DContext.fillStyle = 'white'
                canvas2DContext?.fillRect(x_position, y_position, canvasCellSize, canvasCellSize)

                // @ts-ignore
                canvas2DContext.strokeStyle = 'black'
                canvas2DContext?.strokeRect(x_position, y_position, canvasCellSize, canvasCellSize)


                // Draw the bacteria for the cells that are filled. The cells are drawn as circles
                // that are centered exactly at the middle of each cell (that is filled)

                if(board.isCellFilled(i, j)){
                    //@ts-ignore
                    canvas2DContext.fillStyle = bacteriaColor
                    canvas2DContext?.beginPath()
                    canvas2DContext?.arc(x_position + canvasCellSize / 2 ,
                        y_position + canvasCellSize / 2, bacteriaRadius, 0, 2*Math.PI)
                    canvas2DContext?.fill()
                }


            }

        }

    }, [board, canvasCellSize, bacteriaRadius, bacteriaColor]);

    const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const rectangle = canvasReference.current.getBoundingClientRect()

        const click_x_coordinate = event.clientX - rectangle.left
        const click_y_coordinate = event.clientY - rectangle.top

        const column = Math.floor(click_x_coordinate / canvasCellSize)
        const row = Math.floor(click_y_coordinate / canvasCellSize)

        if (column >= 0 && row >= 0 && column < board.width && row < board.height){
            cellChangeFunction(row, column)
        }
    }


    return(
        <div>
            <canvas ref={canvasReference}
                    width={board.width * canvasCellSize}
                    height={board.height * canvasCellSize}
                    onClick={handleClick}
            >

            </canvas>
        </div>
    )

}

export default BoardCanvas