import React, { useState } from "react";
import { createRoom, joinRoom } from "../lib/firebasehelpers";

function Home({ next }) {
  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    await createRoom(newCode, { host: name, status: "waiting" });
    next({ mode: "create", roomCode: newCode, name });
  }

  async function handleJoinRoom() {
    if (!roomCode.trim()) return alert("Enter a valid room code");
    const exists = await joinRoom(roomCode, { joiner: name });
    if (exists) {
      next({ mode: "join", roomCode, name });
    } else {
      alert("Room not found");
    }
  }

  return (
    <div className="screen-container">
      <h1>WELCOME TO EMOJI CHARADES!</h1>

      <div className="how-to-play">
        <h3>🎮 How to Play</h3>
        <ol>
          <li>Player 1 selects emojis and a secret phrase.</li>
          <li>Player 2 sees the emojis and tries to guess the phrase.</li>
          <li>If the guess is correct, they win!</li>
          <li>Click Play Again to start a new round.</li>
        </ol>
      </div>

      <input
        type="text"
        placeholder="Your nickname"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "20px",
          width: "250px"
        }}
      />

      <div className="room-options">
        <button
          onClick={handleCreateRoom}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "15px"
          }}
        >
          Create Room
        </button>

        <div style={{ marginTop: "10px" }}>
          <input
            type="text"
            placeholder="Enter room code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "160px",
              marginRight: "10px"
            }}
          />
          <button
            onClick={handleJoinRoom}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;