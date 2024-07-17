import React, {useEffect, useRef, useState} from "react";

import Board from "./board"
import Buttons from "../other-components/buttons";
import TickSlider from "../other-components/tickSlider";
import BoardCanvas from "./boardCanvas";
import DimensionChangeInputs from "../other-components/dimensionChangeInputs";

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
        //Only execute the render loop if the application is in a "running" state
        if(runningStateReference.current) {
            let newBoard = simulationBoard.doRenderLoop()
            setSimulationBoard(newBoard)
        }
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

    useEffect(() => {
        const interval = setInterval(doRenderLoop, intervalReference.current * 1000)

        //Stop the render loop from executing
        return () => {
            clearInterval(interval)
        }

    }, []);

    return (
        <div>
            <Buttons
                runningStateChangeFunction={changeRunningState}
                resetFunction={resetSimulation}
                isRunning={runningStateReference.current}></Buttons>
            <TickSlider sliderChangeFunction={updateTickInterval}
                        initialValue={1} maxValue={20} minValue={1}></TickSlider>
            <BoardCanvas board={simulationBoard}
                         canvasCellSize={30} bacteriaRadius={10} bacteriaColor="red"
                         cellChangeFunction={handleCellClick}></BoardCanvas>
            <DimensionChangeInputs defaultWidth={boardProps.width}
                                   defaultHeight={boardProps.height}
                                   dimensionUpdateFunction={alterBoardDimensions}></DimensionChangeInputs>
        </div>

    )
}

export default Simulation;
