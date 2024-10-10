import { ReactNode } from "react";
import { letterState, MAX_GUESSES } from "../constants/constants";
import "../App.css"

type boardProps = {
    prevGuesses: string[],
    currentGuess: string,
    letterStates: letterState[][]
    wordLength: number
}

export default function Board({ prevGuesses, currentGuess, letterStates, wordLength }: boardProps) {
    let key: number = 0;

    let boardRows: ReactNode[] = [];
    prevGuesses.forEach((guess, index) => {
        boardRows.push(<BoardRow wordLength={wordLength} guess={guess} letterStates={letterStates[index]} key={key + index}/>);
    })

    if(prevGuesses.length < MAX_GUESSES) {
        key += prevGuesses.length;
        boardRows.push(<BoardRow wordLength={wordLength} guess={currentGuess}  key={key}/>)
        
        for(let i = key + 1; i < MAX_GUESSES; i++) {
            boardRows.push(<BoardRow wordLength={wordLength} guess={''} key={i}/>);
        }
    }

    return (
        <div className="board">
            {boardRows}
        </div>
    )
}

type boardRowProps = {
    wordLength: number,
    guess?: string,
    letterStates?: letterState[],
}

function BoardRow({wordLength, guess, letterStates} : boardRowProps){
    let letterSquares: ReactNode[] = [];

    if(!guess){
        for(let i = 0; i < wordLength; i++){
            letterSquares.push(<LetterSquare letter=" " state={letterState.unused} key={i}/>)
        }
    } else {
        let filledSquares: number = guess.length;
        let emptySquares: number = wordLength - filledSquares;

        for(let i = 0; i < guess.length; i++){
            letterSquares.push(<LetterSquare letter={guess[i]} state={letterStates ? letterStates[i] : letterState.unused} key={i}/>)
        }

        for(let i = 0; i < emptySquares; i++){
            letterSquares.push(<LetterSquare letter={' '} state={letterState.unused} key={i + filledSquares}/>)
        }
    }


    return (
        <div className="board-row">
            {letterSquares}
        </div>
    )
}

function LetterSquare({letter, state} : {letter: string, state: letterState}): ReactNode{
    return(
        <div className={`letter-square ${state}`}>
            {letter}
        </div>
    )
}