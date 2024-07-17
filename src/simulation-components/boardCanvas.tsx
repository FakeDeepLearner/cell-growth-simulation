import React, {useEffect, useRef} from "react";
import Board from "./board";

import "./boardCanvas.css"

interface CanvasProperties{
    board: Board

    canvasWidth: number
    canvasHeight: number

    //The color of the bacteria circles that will be drawn
    bacteriaColor: string

    cellChangeFunction: (row: number , column: number) => void

}

const BoardCanvas: React.FC<CanvasProperties> = ({ board,
                                                    canvasWidth,
                                                     canvasHeight,
                                                     bacteriaColor,
                                                     cellChangeFunction }) => {
    let cellWidth = canvasWidth / board.width
    let cellHeight = canvasHeight / board.height
    let bacteriaRadius =Math.floor(Math.min(cellWidth, cellHeight) / 2)

    const canvasReference =
        useRef<HTMLCanvasElement>(document.createElement('canvas'))

    //Render the board in a canvas. This is in a useEffect hook because we will update the board in
    // the simulation object and pass it into this canvas
    useEffect(() => {

        const currentCanvas = canvasReference.current
        const canvas2DContext = currentCanvas.getContext("2d")
        //Completely clear the canvas (we will redraw it later)
        // canvas2DContext?.clearRect(0, 0, currentCanvas.width, currentCanvas.height)

        //Draw the grid itself first


        for (let i = 0; i < board.height; i++) {
            for (let j = 0; j < board.width; j++) {
                const x_position = j * cellWidth
                const y_position = i * cellHeight

                //Draw the cells and their borders

                // @ts-ignore
                canvas2DContext.fillStyle = 'white'
                canvas2DContext?.fillRect(x_position, y_position, cellWidth, cellHeight)

                // @ts-ignore
                canvas2DContext.strokeStyle = 'black'
                canvas2DContext?.strokeRect(x_position, y_position, cellWidth, cellHeight)


                // Draw the bacteria for the cells that are filled. The cells are drawn as circles
                // that are centered exactly at the middle of each cell (that is filled)

                if(board.isCellFilled(i, j)){
                    //@ts-ignore
                    canvas2DContext.fillStyle = bacteriaColor
                    canvas2DContext?.beginPath()
                    canvas2DContext?.arc(x_position + cellWidth / 2 ,
                        y_position + cellHeight / 2, bacteriaRadius, 0, 2*Math.PI)
                    canvas2DContext?.fill()
                }


            }

        }

    }, [board, bacteriaRadius, bacteriaColor]);

    const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const rectangle = canvasReference.current.getBoundingClientRect()

        const click_x_coordinate = event.clientX - rectangle.left
        const click_y_coordinate = event.clientY - rectangle.top

        const column = Math.floor(click_x_coordinate / cellWidth)
        const row = Math.floor(click_y_coordinate / cellHeight)
        console.log({
            client_x: event.clientX,
            client_y: event.clientY,
            clicked_x: click_x_coordinate,
            clicked_y: click_y_coordinate,
            column_num: column,
            row_num: row
        })

        if (column >= 0 && row >= 0 && column < board.width && row < board.height){
            cellChangeFunction(row, column)
        }
    }



    return(
        <div className="canvas_container">
            <canvas ref={canvasReference}
                    width={canvasWidth}
                    height={canvasHeight}
                    onClick={handleClick}
                    className="canvas"
            >

            </canvas>
        </div>
    )

}

export default BoardCanvas