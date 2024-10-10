import { useEffect, useState } from "react";
import LengthAdjust from "./LengthAdjust";
import Board from "./Board";
import { gameState, letterState, MAX_GUESSES } from "../constants/constants";
import Results from "./Results";
import { fiveLetterWords } from "../constants/fiveLetterWordsList";
import { sixLetterWords } from "../constants/sixLetterWordsList";
import { sevenLetterWords } from "../constants/sevenLetterWordsList";
import { eightLetterWords } from "../constants/eightLetterWordsList";
import { fourLetterWords } from "../constants/fourLetterWordsList";
import Keyboard from "./Keyboard";

export default function Game() {
    const [wordLength, setWordLength] = useState<number>(5);
    const [word, setWord] = useState<string>('');
    const [currentGuess, setCurrGuess] = useState<string>('');
    const [prevGuesses, setPrevGuesses] = useState<string[]>([]);
    const [letterStates, setLetterStates] = useState<letterState[][]>([]);
    const [keyboardMap, setKeyboardMap] = useState<Map<string, letterState>>(new Map());
    const [playState, setPlayState] = useState<gameState>(gameState.initial);
    const [win, setWin] = useState<boolean>(false);

    function submit(): void {
        if (currentGuess.length === wordLength) {
            let guessCount = prevGuesses.length + 1;
            setPrevGuesses([...prevGuesses, currentGuess]);
            findLetterStates();
            setCurrGuess('');

            if (currentGuess === word) {
                setPlayState(gameState.gameOver);
                setWin(true);
            } else if (guessCount === MAX_GUESSES) {
                setPlayState(gameState.gameOver);
                setWin(false);
            }
        }
    }

    function findLetterStates() {
        let currentGuessStates: letterState[] = Array(wordLength).fill(letterState.absent);
        let accountedFor: boolean[] = Array(wordLength).fill(false);

        for (let i = 0; i < currentGuess.length; i++) {
            if (currentGuess[i] === word[i]) {
                currentGuessStates[i] = letterState.correct;
                accountedFor[i] = true;
            }
        }

        for (let i = 0; i < currentGuess.length; i++) {
            for (let j = 0; j < word.length; j++) {
                if (currentGuessStates[i] !== letterState.correct && !accountedFor[j] && i !== j && currentGuess[i] === word[j]) {
                    currentGuessStates[i] = letterState.present;
                    accountedFor[j] = true;
                }
            }
        }

        for (let i = 0; i < wordLength; i++) {
            let currentKeyState = keyboardMap.get(currentGuess[i]);
            if (currentGuessStates[i] === letterState.correct) {
                keyboardMap.set(currentGuess[i], letterState.correct);
            } else if (currentGuessStates[i] === letterState.present && currentKeyState !== letterState.correct) {
                keyboardMap.set(currentGuess[i], letterState.present);
            } else if (currentGuessStates[i] === letterState.absent && currentKeyState !== letterState.correct && currentKeyState !== letterState.present) {
                keyboardMap.set(currentGuess[i], letterState.absent);
            }
        }

        let newLetterStates = letterStates.slice();
        newLetterStates.push(currentGuessStates);
        setLetterStates(newLetterStates);
    }

    function startGame() {
        switch (wordLength) {
            case 4:
                setWord(fourLetterWords[Math.floor(Math.random() * fourLetterWords.length)].toUpperCase());
                break;
            case 5:
                setWord(fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)].toUpperCase());
                break;
            case 6:
                setWord(sixLetterWords[Math.floor(Math.random() * sixLetterWords.length)].toUpperCase());
                break;
            case 7:
                setWord(sevenLetterWords[Math.floor(Math.random() * sevenLetterWords.length)].toUpperCase());
                break;
            case 8:
                setWord(eightLetterWords[Math.floor(Math.random() * eightLetterWords.length)].toUpperCase());
                break;
            default:
                setWord("A".repeat(wordLength));

        }
        setKeyboardMap(createKeyboardMap());
        setPrevGuesses([]);
        setLetterStates([]);
        setCurrGuess('')
        setPlayState(gameState.playing);
    }

    function handleKey(key: string): void {
        if (playState === gameState.playing) {
            if (key === "Enter") {
                submit();
            }

            if (key === "Backspace") {
                if (currentGuess.length > 0) {
                    setCurrGuess(currentGuess.slice(0, -1));
                }
            }

            if (currentGuess.length < wordLength && key.match(/^[A-Za-z]$/)) {
                if (currentGuess.length < wordLength) {
                    setCurrGuess(currentGuess + key.toUpperCase());
                }
            }
        }
    }

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            handleKey(e.key)
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [playState, currentGuess, prevGuesses, wordLength]);


    return (
        <>
            {playState === gameState.initial &&
                <div className="game-controls">
                    <LengthAdjust wordLength={wordLength} setWordLength={setWordLength} />
                    <button className="start-btn" onClick={startGame}>Play!</button>
                </div>
            }

            {(playState === gameState.playing || playState === gameState.gameOver) && <Board wordLength={word.length} currentGuess={currentGuess} prevGuesses={prevGuesses} letterStates={letterStates} />}
            {playState === gameState.playing && <Keyboard keyboardStates={keyboardMap} handleKey={handleKey} />}
            {playState === gameState.gameOver && <div>
                <Results result={win} guessCount={prevGuesses.length} />
                <div className="game-controls">
                    <LengthAdjust wordLength={wordLength} setWordLength={setWordLength} />
                    <button className="start-btn" onClick={startGame}>Play!</button>
                </div>
            </div>}
        </>
    )
}


function createKeyboardMap(): Map<string, letterState> {
    let map = new Map();
    map.set('Q', letterState.unused);
    map.set('W', letterState.unused);
    map.set('E', letterState.unused);
    map.set('R', letterState.unused);
    map.set('T', letterState.unused);
    map.set('Y', letterState.unused);
    map.set('U', letterState.unused);
    map.set('I', letterState.unused);
    map.set('O', letterState.unused);
    map.set('P', letterState.unused);
    map.set('A', letterState.unused);
    map.set('S', letterState.unused);
    map.set('D', letterState.unused);
    map.set('F', letterState.unused);
    map.set('G', letterState.unused);
    map.set('H', letterState.unused);
    map.set('J', letterState.unused);
    map.set('K', letterState.unused);
    map.set('L', letterState.unused);
    map.set('Z', letterState.unused);
    map.set('X', letterState.unused);
    map.set('C', letterState.unused);
    map.set('V', letterState.unused);
    map.set('B', letterState.unused);
    map.set('N', letterState.unused);
    map.set('M', letterState.unused);
    return map;
}