var airconsole = new AirConsole();

document.getElementById("tapButton").addEventListener("click", function() {
    airconsole.message(AirConsole.SCREEN, {action: "tap"});
});

document.getElementById("readyButton").addEventListener("click", function(){
    airconsole.message(AirConsole.SCREEN, {action: "ready"});
});

document.getElementById("setGoalButton30").addEventListener("click", function(){
    airconsole.message(AirConsole.SCREEN, {action: "setGoal", value: 30});
});

document.getElementById("setGoalButton50").addEventListener("click", function(){
    airconsole.message(AirConsole.SCREEN, {action: "setGoal", value: 50});
});

document.getElementById("setGoalButton100").addEventListener("click", function(){
    airconsole.message(AirConsole.SCREEN, {action: "setGoal", value: 100});
});

document.getElementById("playAgainButton").addEventListener("click", function(){
    airconsole.message(AirConsole.SCREEN, {action: "playAgain"});
});


airconsole.onMessage = function(from, data) {
    var info = document.createElement('DIV');
    info.textContent = "Message from screen: " + data;
    document.body.appendChild(info);
    if (data.action === "gameOver" && airconsole.getDeviceId() === airconsole.getMasterControllerDeviceId()) {
        document.getElementById("playAgainButton").style.display = "block";
    }
    else {        
        document.getElementById("playAgainButton").style.display = "none";
    }
};

airconsole.onReady = function() {
    const masterId = airconsole.getMasterControllerDeviceId();
    const isMaster = airconsole.getDeviceId() === masterId;
    document.getElementById("goalSelector").style.display = isMaster ? "block" : "none";
}
