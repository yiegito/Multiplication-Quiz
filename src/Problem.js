import React, { useState, useEffect } from "react";

function Problem() {
    const [newResponse, setResponse] = useState("");
    const [a, setA] = useState(Math.floor(Math.random() * 10));
    const [b, setB] = useState(Math.floor(Math.random() * 10));
    const [feedback, setFeedback] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [gameTimer, setGameTimer] = useState(60); // Game timer set to 60 seconds (1 minute)
    const [questionTimer, setQuestionTimer] = useState(6); // Question timer set to 6 seconds
    const [isStarted, setIsStarted] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    function generateNewNumbers() {
        setA(Math.floor(Math.random() * 10));
        setB(Math.floor(Math.random() * 10));
        setResponse("");
        setFeedback("");
        setQuestionTimer(6); // Reset question timer for each new question
    }

    const answer = a * b;

    function handleSubmit(e) {
        e.preventDefault();
        setAttempts(attempts + 1);
        if (parseInt(newResponse) === answer) {
            setCorrectCount(correctCount + 1);
            setFeedback("Correct!");
        } else {
            setFeedback("Incorrect!");
        }
        generateNewNumbers();
    }

    function startTimer() {
        setIsStarted(true);
    }

    function resetGame() {
        setIsStarted(false);
        setIsGameOver(false);
        setGameTimer(60);
        setCorrectCount(0);
        setAttempts(0);
        setQuestionTimer(6);
    }

    const percentage = (correctCount / attempts) * 100 || 0;

    useEffect(() => {
        if (isStarted && gameTimer > 0) {
            const gameInterval = setInterval(() => {
                setGameTimer(gameTimer - 1);
            }, 1000);
            return () => clearInterval(gameInterval);
        } else if (isStarted && gameTimer === 0) {
            setIsGameOver(true);
            setIsStarted(false);
        }
    }, [gameTimer, isStarted]);

    useEffect(() => {
        if (isStarted && questionTimer > 0) {
            const questionInterval = setInterval(() => {
                setQuestionTimer(questionTimer - 1);
            }, 1000);
            return () => clearInterval(questionInterval);
        } else if (isStarted && questionTimer === 0) {
            generateNewNumbers();
            setAttempts(attempts + 1);
            setQuestionTimer(6);
        }
    }, [questionTimer, isStarted]);

    return (
        <div className="Problem">
            <div className="Timer"><h1>Test Time: {gameTimer}s</h1></div>
            <div className="Timer2">Question Timer: {questionTimer}s</div>
            
            
            {isStarted ? (
                <p>{a} * {b}</p>
            ) : (
                <p>&nbsp;</p>
            )}
            {isStarted && !isGameOver ? (
                <form onSubmit={handleSubmit}>
                    Enter: <input
                        type="number"
                        value={newResponse}
                        onChange={(e) => setResponse(e.target.value)}
                    />
                    <button type="submit" class="enter">Check</button>
                    <h2>Score: {percentage.toFixed(2)}%</h2>
                    <button onClick={resetGame}>Reset Game</button>
                </form>
                
            ) : (
                <>  
                {!isGameOver && <button onClick={startTimer}>Start</button>}
                    {isGameOver && (
                        <div class="percent">
                            <h2>Game Over!</h2>
                            <h2>Score: {percentage.toFixed(2)}%</h2>
                            <button onClick={resetGame}>Reset Game</button>
                        </div>
                    )}
                </>
            )}
            <p>{feedback}</p>
        </div>
    );
}

export default Problem;
