# Craftcha Guard

## Overview
Craftcha Guard is a web application that replaces standard verification tests with a crafting mini-game based on Minecraft mechanics. To prove they are human and access a comment board, users must correctly arrange items in a 3x3 grid to match a requested crafting recipe. 

## How It Works
1. **Login Prompt**: The user enters a username to join the server.
2. **Challenge Generation**: The backend server selects a random crafting recipe and provides the user with an inventory containing the required items mixed with random extra items.
3. **User Interaction**: The user selects items from their inventory and places them into the 3x3 crafting grid.
4. **Verification**: Once the user submits their grid, the backend checks if the item placement exactly matches the required recipe. If the arrangement is correct, the server issues a token, and the user is granted access to the comment board.

## Project Structure
The repository is divided into two main parts:

* **Client**: The frontend user interface built with React and Vite. It handles the display of the login screen, the interactive crafting grid, the inventory, and the comment board.
* **Server**: The backend API built with Node.js and the Hono framework. It stores the valid crafting recipes, generates unique challenges with a two-minute expiration timer, and verifies the user's submitted answers.

## Setup Instructions

To run this project on your computer, you will need to have Node.js installed. You will need to open two separate terminal windows to run the server and the client at the same time.

### 1. Start the Server
Open your first terminal and navigate to the `server` directory:

1. Install the required packages:
   `npm install`
2. Start the backend server:
   `npm run dev`

The server will begin running locally on port 3001.

### 2. Start the Client
Open your second terminal and navigate to the `client` directory:

1. Install the required packages:
   `npm install`
2. If required, create a `.env.local` file in the client folder and add your Gemini API key:
   `GEMINI_API_KEY=your_api_key_here`
3. Start the frontend application:
   `npm run dev`

The terminal will provide a local web address (usually localhost) where you can view and interact with the application in your web browser.
