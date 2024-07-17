import "./buttons.css"
import React, {useState} from "react";

interface ButtonsProperties{
    runningStateChangeFunction: () => void
    resetFunction: () => void
    isRunning: boolean
}


const Buttons : React.FC<ButtonsProperties> = ({runningStateChangeFunction,
                                               resetFunction,
                                               isRunning}) => {

    const [running, setRunning] = useState<boolean>(isRunning)


    //Order matters here, we need to update the ref in the parent component (Simulation) first
    const handleStartOrPause = () =>{
        runningStateChangeFunction()
        setRunning(prev => !prev)
    }

    //Order matters here, for the same reason as above
    const handleReset = () => {
        resetFunction()
        setRunning(false)
    }

    return (
        <div className="buttons">
            <button onClick={handleStartOrPause} className="start_button">{running ? "Pause" : "Start"}</button>
            <button className="reset_button" onClick={handleReset}>Reset</button>
        </div>
    )

}

export default Buttons