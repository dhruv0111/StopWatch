let hours = 0;
let minutes = 0;
let seconds = 0;
let timerInterval = null;
let lapTimes = [];
let lapNumber = 1;

document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('pause-btn').addEventListener('click', pauseTimer);
document.getElementById('reset-btn').addEventListener('click', resetTimer);
document.getElementById('lap-btn').addEventListener('click', lapTimer);

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        if (seconds >= 60) {
            minutes++;
            seconds = 0;
        }
        if (minutes >= 60) {
            hours++;
            minutes = 0;
        }
        updateDisplay();
    }, 1000);
    document.getElementById('start-btn').disabled = true;
    document.getElementById('pause-btn').disabled = false;
}

function pauseTimer() {
    clearInterval(timerInterval);
    document.getElementById('start-btn').disabled = false;
    document.getElementById('pause-btn').disabled = true;
}

function resetTimer() {
    hours = 0;
    minutes = 0;
    seconds = 0;
    lapTimes = [];
    lapNumber = 1;
    updateDisplay();
    document.getElementById('lap-list').innerHTML = '';
    document.getElementById('start-btn').disabled = false;
    document.getElementById('pause-btn').disabled = true;
}

function lapTimer() {
    const lapTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    lapTimes.push({ lap: lapNumber, time: lapTime });
    const lapList = document.getElementById('lap-list');
    const lapListItem = document.createElement('li');
    lapListItem.textContent = `Lap ${lapNumber}: ${lapTime}`;
    lapList.appendChild(lapListItem);
    lapNumber++;
}

function updateDisplay() {
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Add lap average functionality
function calculateLapAverage() {
    if (lapTimes.length > 1) {
        const totalSeconds = lapTimes.reduce((acc, lap) => {
            const [hours, minutes, seconds] = lap.time.split(':').map(Number);
            return acc + (hours * 3600 + minutes * 60 + seconds);
        }, 0);
        const averageSecond = totalSeconds / lapTimes.length;
        const averageHours = Math.floor(averageSeconds / 3600);
        const averageMinutes = Math.floor((averageSeconds % 3600) / 60);
        const averageSeconds = Math.floor(averageSeconds % 60);
        document.getElementById('lap-average').textContent = `Lap Average: ${averageHours.toString().padStart(2, '0')}:${averageMinutes.toString().padStart(2, '0')}:${averageSeconds.toString().padStart(2, '0')}`;
    }
}

// Add best lap functionality
function calculateBestLap() {
    if (lapTimes.length > 0) {
        const bestLap = lapTimes.reduce((min, lap) => {
            const [hours, minutes, seconds] = lap.time.split(':').map(Number);
            const lapSeconds = hours * 3600 + minutes * 60 + seconds;
            return lapSeconds < min? lapSeconds : min;
        }, Infinity);
        const bestLapHours = Math.floor(bestLap / 3600);
        const bestLapMinutes = Math.floor((bestLap % 3600) / 60);
        const bestLapSeconds = Math.floor(bestLap % 60);
        document.getElementById('best-lap').textContent = `Best Lap: ${bestLapHours.toString().padStart(2, '0')}:${bestLapMinutes.toString().padStart(2, '0')}:${bestLapSeconds.toString().padStart(2, '0')}`;
    }
}

// Update lap average and best lap on each lap
document.getElementById('lap-btn').addEventListener('click', () => {
    calculateLapAverage();
    calculateBestLap();
});