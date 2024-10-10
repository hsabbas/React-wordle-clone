export const MAX_GUESSES: number = 6;
export const API_URL: string = 'https://random-word-api.herokuapp.com/word?length=';

export enum gameState {
    initial,
    playing,
    gameOver
}

export enum letterState {
    unused = "unused",
    absent = "absent",
    present = "present",
    correct = "correct"
}