import { ReactNode } from "react";
import { letterState } from "../constants/constants";

export default function Keyboard({ keyboardStates, handleKey }: { keyboardStates: Map<string, letterState>, handleKey: (key: string) => void }) {
    let keys: ReactNode[] = [];

    keyboardStates.forEach((state, key) => keys.push(<KeyboardKey keyValue={key} state={state} handleKeyDown={() => handleKey(key)} key={key} />))

    return <div className="keyboard">
        <div className="keyboard-row">
            {keys.slice(0, 10)}
        </div>
        <div className="keyboard-row">
            {keys.slice(10, 19)}
        </div>
        <div className="keyboard-row">
            {[
                <KeyboardKey keyValue="ENTER" className='enter' state={letterState.unused} handleKeyDown={() => handleKey('Enter')} key={'Enter'} />,
                keys.slice(19),
                <KeyboardKey keyValue={'\u232b'} className='backspace' state={letterState.unused} handleKeyDown={() => handleKey('Backspace')} key={'Backspace'} />
            ]}
        </div>
    </div>
}

function KeyboardKey({ keyValue, state, handleKeyDown, className }: { keyValue: string, state: letterState, handleKeyDown: (key: string) => void, className?: string }) {
    return <div className={`keyboard-key ${state} ${className}`} onClick={() => handleKeyDown(keyValue)}>
        {keyValue}
    </div>
}