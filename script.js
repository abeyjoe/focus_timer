const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const wrapper = document.querySelector('.timer-wrapper');

// Initial Defaults
let customMinutes = 5;
let customSeconds = 0;

let totalSeconds = customMinutes * 60 + customSeconds;
let timerInterval = null;
let isRunning = false;

// Audio Context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function formatNumber(num) {
    return num.toString().padStart(2, '0');
}

function updateDisplay() {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    minutesEl.textContent = formatNumber(mins);
    secondsEl.textContent = formatNumber(secs);

    document.title = `${formatNumber(mins)}:${formatNumber(secs)} - Focus Timer`;
}

// Update the internal totalSeconds based on displayed custom values
function syncTimeFromCustom() {
    totalSeconds = customMinutes * 60 + customSeconds;
    updateDisplay();
}

// Stepper Logic
function modifyMinutes(amount) {
    if (isRunning) return;
    customMinutes += amount;
    if (customMinutes < 0) customMinutes = 99; // Rollover or clamp? Let's rollover 0->99
    if (customMinutes > 99) customMinutes = 0;
    syncTimeFromCustom();
}

function modifySeconds(amount) {
    if (isRunning) return;
    customSeconds += amount;
    if (customSeconds < 0) {
        customSeconds = 59;
        // Optional: decrement minute? No, keep independent for simple UI.
    }
    if (customSeconds > 59) {
        customSeconds = 0;
        // Optional: increment minute? No.
    }
    syncTimeFromCustom();
}

// Event Listeners for Steppers
document.getElementById('min-up').addEventListener('click', () => modifyMinutes(1));
document.getElementById('min-down').addEventListener('click', () => modifyMinutes(-1));
document.getElementById('sec-up').addEventListener('click', () => modifySeconds(5)); // Jump by 5 for speed?? Or 1? Let's do 1 for precision, maybe 5 is better UX. Let's stick to 1 per request, but maybe 1 adds up. I'll stick to 1 for now.
document.getElementById('sec-down').addEventListener('click', () => modifySeconds(-1));


function playAlarm() {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime);
    osc.frequency.setValueAtTime(1760, audioCtx.currentTime + 0.5);

    gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1);

    osc.start();
    osc.stop(audioCtx.currentTime + 1);
}

function triggerAlarm() {
    let count = 0;
    const alarmInterval = setInterval(() => {
        playAlarm();
        count++;
        if (count >= 5) clearInterval(alarmInterval);
    }, 1200);
}

function startTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.textContent = 'Start';
        wrapper.classList.remove('running');
        return;
    }

    if (totalSeconds === 0) return;

    if (audioCtx.state === 'suspended') audioCtx.resume();

    isRunning = true;
    startBtn.textContent = 'Pause';
    wrapper.classList.add('running'); // CSS will hide steppers

    timerInterval = setInterval(() => {
        totalSeconds--;
        updateDisplay();

        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            startBtn.textContent = 'Start';
            wrapper.classList.remove('running');
            totalSeconds = 0;
            updateDisplay();
            wrapper.classList.add('timer-finished');
            triggerAlarm();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.textContent = 'Start';
    wrapper.classList.remove('running');
    wrapper.classList.remove('timer-finished');

    // Reset to the CUSTOM time set by user
    syncTimeFromCustom();
    document.title = 'Focus Timer';
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

// Initial call
syncTimeFromCustom();
