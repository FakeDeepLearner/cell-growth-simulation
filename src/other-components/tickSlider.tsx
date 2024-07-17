import "./tickSlider.css"
import React, {useState} from "react";


interface SliderProperties{
    sliderChangeFunction: (newInterval: number) => void
    initialValue: number
    maxValue: number
    minValue: number
}

const TickSlider : React.FC<SliderProperties> = ({ sliderChangeFunction,
                                                    initialValue,
                                                    maxValue,
                                                     minValue
                                                 }) => {

    const [currentValue, setCurrentValue] = useState<number>(initialValue)

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value)
        sliderChangeFunction(newValue)
        setCurrentValue(newValue)
    }


    return(
        <div className="slider-container">
            <h4>Tick rate: {currentValue} seconds</h4>
            <input type="range" min={minValue} max={maxValue} defaultValue={initialValue} className="slider"
            id="slider" onChange={handleSliderChange}/>
        </div>
    )
}

export default TickSlider
