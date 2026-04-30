// 1. Quotes
const motivationQuotes = [
    "Focus on being productive, not busy.",
    "Your future self will thank you for today.",
    "Quality is not an act, it is a habit.",
    "Keep going, you're doing great!"
];
function updateQuote() {
    const idx = Math.floor(Math.random() * motivationQuotes.length);
    document.getElementById('quote').innerText = `"${motivationQuotes[idx]}"`;
}

// 2. Playlist Logic
const playBtn = document.getElementById('playPauseBtn');
const nextBtn = document.getElementById('nextBtn');
const vinyl = document.getElementById('vinylDisc');
const audio = document.getElementById('studyAudio');
const songTitle = document.getElementById('songTitle');

// List your songs here
const playlist = [
    { title: "Lofi Girl - Chill", file: "song1.mp3" },
    { title: "Study Session - Deep Focus", file: "song2.mp3" },
    { title: "Soft Piano - Relaxation", file: "song3.mp3" }
];

let currentSongIdx = 0;

function loadSong(index) {
    audio.src = playlist[index].file;
    songTitle.innerText = playlist[index].title;
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        vinyl.classList.add('rotating');
        playBtn.innerText = "Pause";
    } else {
        audio.pause();
        vinyl.classList.remove('rotating');
        playBtn.innerText = "Play";
    }
});

nextBtn.addEventListener('click', () => {
    currentSongIdx = (currentSongIdx + 1) % playlist.length;
    loadSong(currentSongIdx);
    if (!audio.paused || vinyl.classList.contains('rotating')) {
        audio.play();
    }
});

// 3. Timer
let countdown;
let timeRemaining = 25 * 60;
const display = document.getElementById('timeDisplay');
document.getElementById('startBtn').addEventListener('click', function() {
    if (countdown) return;
    countdown = setInterval(() => {
        timeRemaining--;
        let m = Math.floor(timeRemaining / 60);
        let s = timeRemaining % 60;
        display.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
        if (timeRemaining <= 0) clearInterval(countdown);
    }, 1000);
});
document.getElementById('resetBtn').addEventListener('click', () => {
    clearInterval(countdown);
    countdown = null;
    timeRemaining = 25 * 60;
    display.innerText = "25:00";
});

// 4. Tasks
const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskContainer = document.getElementById('taskContainer');
addBtn.addEventListener('click', () => {
    const val = taskInput.value.trim();
    if (val === "") return;
    const li = document.createElement('li');
    li.className = "task-item";
    li.innerHTML = `<span>${val}</span><div class="task-actions">
        <button onclick="completeTask(this)" class="btn-green" style="padding:4px 8px; font-size:10px;">Done</button>
        <button onclick="this.parentElement.parentElement.remove()" style="background:#FFB7B7; color:white; padding:4px 8px; font-size:10px;">X</button>
    </div>`;
    taskContainer.appendChild(li);
    taskInput.value = "";
});
function completeTask(btn) { btn.parentElement.parentElement.classList.toggle('completed'); }