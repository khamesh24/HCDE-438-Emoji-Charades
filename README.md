# 🎉 Emoji Charades

Emoji Charades is a two-player web game where one player creates an emoji puzzle for the other to guess. Designed to be fun, fast, and creative, the game lets players communicate ideas through emoji combinations.

## 📘 Project Overview

This project was developed as a final project for HCDE 438. The goal was to create a real-time multiplayer experience using Firebase and React. The game supports room creation, emoji-based phrase setting, guessing, and displaying results.

## 🛠 Technologies Used

- React (Vite)
- Firebase (Firestore for real-time updates)
- emoji-picker-react
- JavaScript (ES6)
- CSS

## ⚙️ Setup and Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/khamesh24/HCDE-438-Emoji-Charades.git
   cd HCDE-438-Emoji-Charades

	2.	Install dependencies

npm install


	3.	Add Firebase configuration
	•	Replace the config in firebase.js with your Firebase project’s config object.
	4.	Run the app locally

npm run dev


	5.	Deploy to Firebase

npm run build
firebase deploy



▶️ How to Play
1. Player 1 enters a nickname and creates a room.
2. Player 2 enters the code to join.
3. Player 1 picks emojis and sets a secret phrase.
4. Player 2 sees the emojis and guesses the phrase.
5. A results screen shows the outcome.

🔄 Challenges Faced
1. Manual screen flow management: Instead of using React Router, screen transitions are manually controlled through a stage state variable in App.jsx, which proved tricky to debug as the application grew in complexity.
2. State syncing: Ensuring consistent room status between two users was difficult, especially with Firebase’s real-time data model.
3. Glitchy transitions: Some screens (like results) occasionally glitch, especially on the host’s side.

🚧 Known Issues
1. 🚫 No validation for the phrase — any string is accepted regardless of clarity.
2. ⚠️ Result screen may glitch for Player 1, not showing the final guess properly.
3. No user authentication or persistent data.
4. No way to check if both players are on the same screen during unexpected reloads.

📈 Future Enhancements
1. Add phrase validation or AI-assisted suggestions.
2. Improve visual feedback for correct/incorrect guesses.
3. Fix result screen bugs and improve role-based UI behavior.
4. Add basic user login or persistent nickname tracking.

⸻

👤 Author

Made by Khamesh Mittal
University of Washington, HCDE 438 Final Project
