import React, { useEffect, useState } from "react";
import { listenToRoom, updateRoom } from "../lib/firebasehelpers";

function GuessScreen({ roomCode, onSubmit }) {
  const [emojis, setEmojis] = useState([]);
  const [guess, setGuess] = useState("");

  useEffect(() => {
    const unsubscribe = listenToRoom(roomCode, (data) => {
      if (data && data.emojis) {
        setEmojis(data.emojis);
      }
    });
    return () => unsubscribe();
  }, [roomCode]);

  async function handleSubmit() {
    if (guess.trim()) {
      await updateRoom(roomCode, { guess });
      onSubmit(guess);
    }
  }

  return (
    <div className="screen-container">
      <h2>Guess the Phrase!</h2>
      <div className="emoji-display">{emojis.join(" ")}</div>
      <input
        type="text"
        placeholder="Enter your guess"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit Guess</button>
    </div>
  );
}

export default GuessScreen;