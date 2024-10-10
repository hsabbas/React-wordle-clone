import { Dispatch, SetStateAction } from "react"

type lengthAdjustProps = {
    wordLength: number,
    setWordLength: Dispatch<SetStateAction<number>>
}

export default function LengthAdjust({wordLength, setWordLength} : lengthAdjustProps){
    function handleDecreaseClick() : void{
        if(wordLength > 4){
            setWordLength(wordLength - 1)
        }
    }

    function handleIncreaseClick(){
        if(wordLength < 8){
            setWordLength(wordLength + 1)
        }
    }

    return(
        <div className="length-adjust">
            <div className="length-label">Letters:</div>
            <div className="length-controls">
                <button className="decrease-btn" onClick={handleDecreaseClick}>-</button>
                <div className="word-length">{wordLength}</div>
                <button className="increase-btn" onClick={handleIncreaseClick}>+</button>
            </div>
        </div>
    )
}