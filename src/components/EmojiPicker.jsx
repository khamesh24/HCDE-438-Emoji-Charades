import React, { useState } from "react";
import EmojiPickerLib from "emoji-picker-react";
import { updateRoom } from "../lib/firebasehelpers";

function EmojiPicker({ roomCode, onSubmit }) {
  const [selected, setSelected] = useState([]);
  const [phrase, setPhrase] = useState("");

  const handleEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji;
    setSelected((prev) =>
      prev.includes(emoji) ? prev.filter((e) => e !== emoji) : [...prev, emoji]
    );
  };

  async function handleSubmit() {
    if (selected.length > 0 && phrase.trim()) {
      await updateRoom(roomCode, {
        emojis: selected,
        phrase: phrase.trim(),
        status: "ready"
      });
      onSubmit();
    } else {
      alert("Please select at least one emoji and enter a phrase.");
    }
  }

  return (
    <div className="screen-container">
      <h2>Pick emojis:</h2>
      <div>
        <EmojiPickerLib onEmojiClick={handleEmojiClick} />
      </div>
      <div className="emoji-display">
        Selected: {selected.join(" ")}
      </div>
      <input
        type="text"
        placeholder="Enter phrase"
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: "#28a745",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer",
          marginTop: "15px"
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default EmojiPicker;