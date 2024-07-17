import "./dimensionChangeInputs.css"

import React, {useState} from "react";

interface ChangeInputProperties{
    defaultWidth: number;
    defaultHeight: number

    dimensionUpdateFunction: (width: number, height: number) => void
}

const DimensionChangeInputs : React.FC<ChangeInputProperties> = ({defaultWidth,
                                                                     defaultHeight,
                                                                 dimensionUpdateFunction}) => {
    const [width, setWidth] = useState(defaultWidth)

    const [height, setHeight] = useState(defaultHeight)

    const handleUpdateWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWidth(Number(event.target.value))
    }

    const handleUpdateHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHeight(Number(event.target.value))
    }

    const handleConfirmation = () => {
        dimensionUpdateFunction(width, height)
    }

    return (
        <div className="inputs">
            <label className="width_label">
                Width:
                <br/>
                <input className="width_input" type="number" value={width} onChange={handleUpdateWidth} min={1}/>
            </label>
            <label className="height_label">
                Height:
                <br/>
                <input className="height_input" type="number" value={height} onChange={handleUpdateHeight} min={1}/>
            </label>
            <br/>
            <button className="enter_button" onClick={handleConfirmation}>Confirm</button>

        </div>
    )
}