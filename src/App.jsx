import React, { useState, useEffect } from "react";
import Home from "./components/Home.jsx";
import EmojiPicker from "./components/EmojiPicker.jsx";
import GuessScreen from "./components/GuessScreen.jsx";
import ResultScreen from "./components/ResultScreen.jsx";
import { listenToRoom, updateRoom } from "./lib/firebasehelpers";
import "./styles/App.css";

function App() {
  const [stage, setStage] = useState("home");
  const [roomCode, setRoomCode] = useState("");
  const [mode, setMode] = useState(""); // "create" or "join"
  const [guess, setGuess] = useState("");
  const [emojiSubmitted, setEmojiSubmitted] = useState(false);
  const [player2Joined, setPlayer2Joined] = useState(false);
  const [player2Guessed, setPlayer2Guessed] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (roomCode) {
      const unsubscribe = listenToRoom(roomCode, (data) => {
        if (data?.joined) setPlayer2Joined(true);
        if (data?.emojis && data?.phrase) setEmojiSubmitted(true);
        if (data?.guess) {
          setGuess(data.guess);
          setPlayer2Guessed(true);
        } else {
          setPlayer2Guessed(false);
        }
      });
      return () => unsubscribe();
    }
  }, [roomCode]);

  useEffect(() => {
    if (roomCode && mode === "join") {
      updateRoom(roomCode, { joined: true });
    }
  }, [roomCode, mode]);

  const resetGame = () => {
    setGuess("");
    setPlayer2Guessed(false);
    setShowAnswer(false);
    setStage("guess");
  };

  return (
    <div className="app-container">
      {stage === "home" && (
        <Home
          next={({ mode, roomCode }) => {
            setMode(mode);
            setRoomCode(roomCode);
            setStage(mode === "create" ? "picker" : "guess");
          }}
        />
      )}

      {stage === "picker" && mode === "create" && (
        player2Joined ? (
          emojiSubmitted ? (
            player2Guessed ? (
              <div className="screen-container">
                <h2>Player 2 guessed:</h2>
                <p className="guess-display">"{guess}"</p>
                {!showAnswer ? (
                  <div style={{ marginTop: "20px" }}>
                    <button onClick={resetGame} style={{ marginRight: "20px", backgroundColor: "#ffcc00" }}>
                      Try Again
                    </button>
                    <button onClick={() => setShowAnswer(true)} style={{ backgroundColor: "#ff4444" }}>
                      Give Up
                    </button>
                  </div>
                ) : (
                  <ResultScreen
                    roomCode={roomCode}
                    reveal={true}
                    winner={"Player 1"}
                    restart={() => setStage("home")}
                  />
                )}
              </div>
            ) : (
              <div className="screen-container">
                <h2>Waiting for Player 2's guess...</h2>
              </div>
            )
          ) : (
            <EmojiPicker
              roomCode={roomCode}
              onSubmit={() => setEmojiSubmitted(true)}
            />
          )
        ) : (
          <div className="screen-container">
            <h2>Room Code: {roomCode}</h2>
            <p>Waiting for Player 2 to join...</p>
          </div>
        )
      )}

      {stage === "guess" && mode === "join" && (
        emojiSubmitted ? (
          <GuessScreen
            roomCode={roomCode}
            onSubmit={(userGuess) => {
              setGuess(userGuess);
              setStage("result");
            }}
          />
        ) : (
          <div className="screen-container">
            <p>Waiting for Player 1 to submit emojis...</p>
          </div>
        )
      )}

      {stage === "result" && (
        <ResultScreen
        guess={guess}
        mode={mode} // pass down
        roomCode={roomCode}
        onGuessAgain={() => setStage("guess")}
        onGiveUp={() => setStage("home")}
      />
      )}
    </div>
  );
}

export default App;