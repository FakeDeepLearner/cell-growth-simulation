import React, {useEffect, useRef, useState} from "react";

import Board from "./board"

interface BoardProperties{
    height: number;
    width: number;
}



interface SimulationProperties {
    tickInterval: number
    isRunning: boolean
    boardProperties: BoardProperties
}




const Simulation : React.FC<SimulationProperties> = ({isRunning,
                                                        tickInterval,
                                                         boardProperties
                                                      }) => {

    const runningStateReference = useRef<boolean>(isRunning)

    const intervalReference = useRef<number>(tickInterval)


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

    const changeRunningState = () => {
        runningStateReference.current = !runningStateReference.current
    }

    const updateTickInterval = (newInterval: number) => {
        intervalReference.current = newInterval
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
        runningStateReference.current = false

    }

    const handleCellClick = (row: number, column: number) => {
        setSimulationBoard(prevBoard => {
            return prevBoard.newBoardWithChangedCell(row, column);
        })
    }

    return (
        <div>
        </div>

    )
}

export default Simulation;
