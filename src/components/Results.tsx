export default function Results({result, guessCount}: {result:boolean, guessCount: number}){
    return <div className="result">
        {`You ${result ? 'won' : 'lost' } after ${guessCount} guesses!` }
    </div>
}