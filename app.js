// A simple stopwatch class that can start, pause, and reset a timer.
class Stopwatch {
    
    constructor(timerDisplay, startButton) {
        this.timerDisplay = timerDisplay;
        this.startButton = startButton;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.currentTime;
        this.paused = true;
        this.interval;
    }

    /*
    Starts the timer at the beginning, and if it is paused.
    Sets the initial startTime and elapsedTime variables
    using the nr of miliseconds returned from Date.now().
    The setInterval() method calls the updateDisplay() function
    every second to update the timer display.
    Using bind ensures the upDateDisplay is called repeatedly (without it it'll only be called once).
    */
    startTimer() {
        if (this.paused) {
            this.paused = false;
            this.startButton.innerText = "START"; 
            this.startTime = Date.now() - this.elapsedTime;
            this.interval = setInterval(this.updateDisplay.bind(this), 1000);  }
    }


    /* 
    Pauses the timer.
    Calculates the exact time for when the value is stopped so that the timer
    is accurate when resuming even if a longer time elapsed (in case of lags or delays in updateDisplay()).
    */
    pauseTimer() {
        if (!this.paused) {
            this.startButton.innerText = "RESUME";
            this.paused = true;
            this.elapsedTime = Date.now() - this.startTime;
            clearInterval(this.interval);
        }
    }

    resetTimer() {
        this.paused = true;
        clearInterval(this.interval);
        this.timerDisplay.innerText = "00:00:00";
        this.startTime = 0;
        this.elapsedTime = 0;
    
    }

    updateDisplay() {
        this.elapsedTime = Date.now() - this.startTime;
            // divided by milliseconds
        let secs = Math.floor(this.elapsedTime / 1000 % 60);
            // 6000 ms in every minute
        let mins = Math.floor((this.elapsedTime / (1000 * 60)) % 60);
            // mins * hours
        let hrs = Math.floor((this.elapsedTime / (1000 * 60 * 60)) % 60);
        if (hrs <= 99) {
            let secsValue = secs < 10 ? `0${secs}` : `${secs}`;
            let minsValue = mins < 60 ? `0${mins}` : `${mins}`;
            let hrsValue = hrs < 60 ? `0${hrs}` : `${hrs}`;
            this.timerDisplay.innerText = `${hrsValue}:${minsValue}:${secsValue}`;
        } else {
            this.timerDisplay.innerText = "00:00:00"
        }
    }
}

// getting hold of DOM elements, creating stopwatch instance, and adding event listeners to buttons
const startButton = document.querySelector("[data-start]");
const pauseButton = document.querySelector("[data-stop]");
const resetButton = document.querySelector("[data-reset]");
const timerDisplay = document.querySelector("[data-timer]");

const stopwatch = new Stopwatch(timerDisplay, startButton);


startButton.addEventListener("click", () => {
    stopwatch.startTimer();
})

pauseButton.addEventListener("click", () => {
    stopwatch.pauseTimer();
})

resetButton.addEventListener("click", () => {
    stopwatch.resetTimer();
})
