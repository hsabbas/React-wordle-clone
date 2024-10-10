import { ReactNode } from "react";
import { letterState } from "../constants/constants";

export default function Keyboard({keyboardStates, handleKey}: {keyboardStates: Map<string, letterState>, handleKey: (key: string) => void}){
    let keys: ReactNode[] = [];

    keyboardStates.forEach((state, key) => keys.push(<KeyboardKey keyValue={key} state={state} handleKeyDown={handleKey} key={key}/>))

    return <div className="keyboard">
        {keys}
    </div>
}

function KeyboardKey({keyValue, state, handleKeyDown}: {keyValue: string, state: letterState, handleKeyDown: (key: string) => void}){
    return <div className={`keyboard-key ${state}`} onClick={() => handleKeyDown(keyValue)}>
        {keyValue}
    </div>
}