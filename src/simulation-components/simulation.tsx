import React, {useCallback, useEffect, useRef, useState} from "react";

import Board from "./board"
import Buttons from "../other-components/buttons";
import TickSlider from "../other-components/tickSlider";
import BoardCanvas from "./boardCanvas";
import DimensionChangeInputs from "../other-components/dimensionChangeInputs";
import "./simulation.css"

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

    const [currentInterval, setCurrentInterval] = useState<number>(tickInterval)


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
        if(!runningStateReference.current && simulationBoard.isEmpty()){
            alert("Please fill at least one cell on the grid before starting the simulation")
            return false
        }
        else {
            runningStateReference.current = !runningStateReference.current
            return true
        }
    }

    const updateTickInterval = (newInterval: number) => {
        setCurrentInterval(newInterval)
    }

    const alterBoardDimensions = (width: number, height: number): boolean => {

        if(runningStateReference.current){
            changeRunningState()
            alert("You may not update the dimensions while the simulation is running\n" +
                "The simulation has been paused")
            return false;
        }
        else {

            if (simulationBoard.completelyFilled) {
                alert("The board is full, you can not change the dimensions of a full board")
                return false;
            }
            else {
                setBoardProps(prevState => ({
                    ...prevState,
                    height: height,
                    width: width
                }))
                return true
            }
        }
    }

    const doRenderLoop = useCallback(() => {
        //Only execute the render loop if the application is in a "running" state
        if(runningStateReference.current && !simulationBoard.completelyFilled) {
            setSimulationBoard(prevBoard => {
                return prevBoard.doRenderLoop()
            })
            console.log("Render loop executed")
        }

    }, [])

    const resetSimulation = () => {
        let newBoard = new Board(boardProps.width, boardProps.height)
        setSimulationBoard(newBoard)
        runningStateReference.current = false

    }

    const handleCellClick = (row: number, column: number) => {
        if(runningStateReference.current){
            changeRunningState()
            alert("You may not add or remove cells while the simulation is underway\n" +
                "The simulation has been paused")
        }
        else {
            setSimulationBoard(prevBoard => {
                return prevBoard.newBoardWithChangedCell(row, column);
            })
        }
    }

    useEffect(() => {
        const newInterval = setInterval(doRenderLoop, currentInterval * 1000)

        //Stop the render loop from executing
        return () => {
            clearInterval(newInterval)
            
        }
    }, [currentInterval, doRenderLoop]);

    return (
        <div className="main_body">
            <Buttons
                runningStateChangeFunction={changeRunningState}
                resetFunction={resetSimulation}
                isRunning={false}
                ></Buttons>
            <div className="lateral">
                <TickSlider sliderChangeFunction={updateTickInterval}
                        initialValue={1} maxValue={10} minValue={1}></TickSlider>
                <BoardCanvas board={simulationBoard}
                             canvasWidth={500}
                             canvasHeight={400}
                             bacteriaColor={"red"}
                             cellChangeFunction={handleCellClick}></BoardCanvas>
                <DimensionChangeInputs defaultWidth={boardProps.width}
                                   defaultHeight={boardProps.height}
                                   dimensionUpdateFunction={alterBoardDimensions}></DimensionChangeInputs>
            </div>
        </div>

    )
}

export default Simulation;
