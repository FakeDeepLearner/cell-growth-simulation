import React, {useEffect, useState} from "react";

import Board from "./board"

interface BoardProperties{
    height: number;
    width: number;
}

interface SimulationProperties {
    running: boolean;
    paused: boolean;
    tickInterval: number
    boardProperties: BoardProperties

}




const Simulation : React.FC<SimulationProperties> = ({running,
                                                         paused,
                                                        tickInterval,
                                                         boardProperties
                                                      }) => {
    const [isPaused, setIsPaused] = useState<boolean>(paused)

    const [isRunning, setIsRunning] = useState<boolean>(running)

    const [interval, setInterval] = useState<number>(1)



    const [boardProps, setBoardProps] =
        useState<BoardProperties>(boardProperties)


    const [simulationBoard,
        setSimulationBoard] =
        useState<Board>(new Board(boardProperties.width, boardProperties.height))

    //Whenever the width or the height changes, re-render a fresh board.
    //This will be used in dynamic resizing.
    //This will be unavailable when the simulation is running or paused
    useEffect(() => {
        const renderBoard = () => {
            let board = new Board(boardProps.width, boardProps.height)
            setSimulationBoard(board)
        }
        renderBoard();
    }, [boardProps]);

    const alterPaused = () => {
        setIsPaused(!isPaused)
    }

    const alterRunning = () => {
        setIsRunning(!isRunning)
    }

    const updateTickInterval = (newInterval: number) => {
        setInterval(newInterval)
    }

    const alterBoardDimensions = (width: number, height: number) => {
        setBoardProps(prevState => ({
            ...prevState,
            height: height,
            width: width
        }))
    }

    const doRenderLoop = () => {
        let newBoard = simulationBoard.doRenderLoop()
        setSimulationBoard(newBoard)
    }

    const resetSimulation = () => {
        let newBoard = new Board(boardProps.width, boardProps.height)
        setSimulationBoard(newBoard)
        setIsRunning(false)
        setIsPaused(true)
    }

    const handleCellClick = (row: number, column: number) => {
        setSimulationBoard(prevBoard => {
            return prevBoard.newBoardWithChangedCell(row, column);
        })

    }

    return (
        <div>
            {running}
            <div>
                {paused}
            </div>
        </div>

    )
}

export default Simulation;
