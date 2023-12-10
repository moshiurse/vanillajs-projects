
let isRunning = false;
let timeInterval;
let minutes = 25;
let seconds = 0;

function startTimer(workTime) {
    if (!isRunning) {
        isRunning = true;
        document.getElementById("startWork").disabled = true;
        document.getElementById("startShortBreak").disabled = true;
        document.getElementById("startLongBreak").disabled = true;
        document.getElementById("stop").disabled = false;
        document.getElementById("reset").disabled = false;

        minutes = workTime;
        seconds = 0;
        updateTimer();

        timeInterval = setInterval(updateTimer, 1000);
    }
}

function updateTimer() {
    if (minutes === 0 && seconds === 0) {
        clearInterval(timeInterval);
        isRunning = false;
        document.getElementById("startWork").disabled = false;
        document.getElementById("startShortBreak").disabled = false;
        document.getElementById("startLongBreak").disabled = false;
        document.getElementById("stop").disabled = true;
        document.getElementById("reset").disabled = false;
        alert("Session completed!");
    } else {
        if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        document.getElementById("timer").textContent =
            minutes.toString().padStart(2, "0") +
            ":" +
            seconds.toString().padStart(2, "0");
    }
}

document.getElementById("startWork").addEventListener("click", () => startTimer(25));
document.getElementById("startShortBreak").addEventListener("click", () => startTimer(5));
document.getElementById("startLongBreak").addEventListener("click", () => startTimer(10));

document.getElementById("stop").addEventListener("click", function () {
    clearInterval(timeInterval);
    isRunning = false;
    document.getElementById("startWork").disabled = false;
    document.getElementById("startShortBreak").disabled = false;
    document.getElementById("startLongBreak").disabled = false;
    document.getElementById("stop").disabled = true;
    document.getElementById("reset").disabled = false;
});

document.getElementById("reset").addEventListener("click", function () {
    clearInterval(timeInterval);
    isRunning = false;
    minutes = 25;
    seconds = 0;
    document.getElementById("timer").textContent = "25:00";
    document.getElementById("startWork").disabled = false;
    document.getElementById("startShortBreak").disabled = false;
    document.getElementById("startLongBreak").disabled = false;
    document.getElementById("stop").disabled = true;
    document.getElementById("reset").disabled = false;
});