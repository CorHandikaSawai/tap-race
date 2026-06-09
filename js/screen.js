// Game variables
const PLAYERS = {};
let targetScore = 30;
let gameState = "LOBBY"; // Possible states: LOBBY, COUNTDOWN, PLAYING, GAME_OVER
showScreen(gameState); // Show the initial lobby screen

function showScreen(state) {
    // Remove active class from all screens
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    // Map the stat4e to the matching panel ID
    const screenId = {
        LOBBY: "lobby-screen",
        COUNTDOWN: "countdown-screen",
        PLAYING: "playing-screen",
        GAME_OVER: "gameover-screen"
    }

    // Add "active" class to the current screen
    document.getElementById(screenId[state]).classList.add("active");
}


// Reset the game to its initial state
function resetGame() {
    // Reset each playser's score and ready status
    Object.keys(PLAYERS).forEach(deviceId => PLAYERS[deviceId] = {score: 0, ready: false});
    // Reset gameState back to Lobby
    gameState = "LOBBY";
    showScreen(gameState); // Show the lobby screen
    // Broadcast to controllers that the game has been reset
    airconsole.broadcast({action: "reset"});

}

// Ensure a player object exists for the given device ID
// If player does not exist, create a new player with score 0 and ready status false
function ensurePlayer(deviceId) {
    if (!PLAYERS[deviceId]) {
        PLAYERS[deviceId] = {
            score: 0, 
            ready: false
        };
    }
}

// Render the player scores on the screen
function renderPlayers() {
    const html = Object.entries(PLAYERS).map(([deviceId, player]) => `<h2>Player ${deviceId}: ${player.score} taps</h2>`).join("");
    if (gameState === "LOBBY") {
        document.getElementById("lobby-players").innerHTML = html;
    }
    else if (gameState === "PLAYING") {
        document.getElementById("playing-players").innerHTML = html;
    }
}

// Check if all players are ready
function allPlayersReady() {
    return Object.values(PLAYERS).every(player => player.ready);
}

// Start the countdown to the game start
function startCountdown() {
    gameState = "COUNTDOWN";
    let count = 3;
    const gameStatusElement = document.getElementById("countdown-number");
    showScreen(gameState); // Show the countdown screen

    // Update the screen immediately with the initial countdown message
    gameStatusElement.innerText = count;

    // Set an interval to update the countdown every second
    let timerId = setInterval(() => {
        count--;
        if (count <= 0) {
            clearInterval(timerId);
            gameState = "PLAYING";
            gameStatusElement.innerText = "Go!";
            showScreen(gameState); // Show the playing screen
            renderPlayers(); // Render the initial player scores
        }
        else {
            gameStatusElement.innerText = count;
        }
    }, 1000);
}



// Handle incoming messages from controllers
var airconsole = new AirConsole();


airconsole.onConnect = function(deviceId){
    ensurePlayer(deviceId);
    renderPlayers();
}

airconsole.onMessage = function(from, data) {
    if (data) {
        if (gameState === "LOBBY") {
            if (data.action === "setGoal") {
               const masterId = airconsole.getMasterControllerDeviceId();
                if (from === masterId) {
                    targetScore = data.value;
                }
            }
            if (data.action === "ready") {
                PLAYERS[from].ready = true;
            }
            if (allPlayersReady() && Object.keys(PLAYERS).length > 1) {
                startCountdown();
            }
        }
        if (gameState === "PLAYING"){
            if (data.action === "tap") {
                PLAYERS[from].score += 1;
            }
            if (PLAYERS[from].score >= targetScore) {
                document.getElementById("final-scores").innerText = "Player " + from + " Wins!";
                gameState = "GAME_OVER";
                showScreen(gameState); // Show the game over screen
                airconsole.broadcast({action: "gameOver"});
            }
        }
        if (gameState === "GAME_OVER") {
            if (data.action === "playAgain") {
                const masterId = airconsole.getMasterControllerDeviceId();
                if (from === masterId) { 
                    resetGame();   
                }
            }
        }       
    }

    renderPlayers();
}