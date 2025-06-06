import React, { useEffect, useState } from "react";
import { listenToRoom, updateRoom } from "../lib/firebasehelpers";

function ResultScreen({ roomCode, mode, onTryAgain, onGiveUp }) {
  const [data, setData] = useState({ phrase: "", guess: "", emojis: [] });

  useEffect(() => {
    const unsub = listenToRoom(roomCode, (doc) => {
      if (doc) setData(doc);
    });
    return () => unsub?.();
  }, [roomCode]);

  const normalized = (text) => text?.trim().toLowerCase() || "";
  const isCorrect = normalized(data.phrase) === normalized(data.guess);

  return (
    <div className="screen-container">
      <h2>Results</h2>
      <div className="emoji-display">{data.emojis?.join(" ")}</div>

      <p>
        <strong>Player 2 guessed:</strong> "{data.guess}"
      </p>

      {isCorrect ? (
        <h3 style={{ color: "lime" }}>🎉 You guessed it right!</h3>
      ) : data.gaveUp ? (
        <>
          <p>Correct Phrase: <strong>{data.phrase}</strong></p>
          <h3 style={{ color: "orange" }}>🏁 Game ended!</h3>
        </>
      ) : mode === "join" ? (
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button
            style={{ backgroundColor: "#FFD700", color: "#111" }}
            onClick={onTryAgain}
          >
            Try Again
          </button>
          <button
            style={{ backgroundColor: "#ff3b3b", color: "#fff" }}
            onClick={onGiveUp}
          >
            Give Up
          </button>
        </div>
      ) : (
        <p><em>Waiting for Player 2's action...</em></p>
      )}
    </div>
  );
}

export default ResultScreen;