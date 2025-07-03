let [seconds, minutes, hours] = [0, 0, 0];
let display = document.getElementById("display");
let lapsContainer = document.getElementById("laps");
let timer = null;
let themeToggle = null;
let modeLabel = null;

window.onload = function () {
  loadLaps();
  themeToggle = document.getElementById("themeToggle");
  modeLabel = document.getElementById("modeLabel");

  const savedTheme = localStorage.getItem("theme") || "dark";
  document.body.classList.add(savedTheme);

  if (savedTheme === "dark") {
    themeToggle.checked = true;
    modeLabel.innerText = "Dark Mode ON";
  } else {
    themeToggle.checked = false;
    modeLabel.innerText = "Dark Mode OFF";
  }
};

function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  display.innerText = `${h}:${m}:${s}`;
}

function start() {
  if (timer !== null) return;
  timer = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
    updateDisplay();
  }, 1000);
}

function pause() {
  clearInterval(timer);
  timer = null;
}

function reset() {
  pause();
  [seconds, minutes, hours] = [0, 0, 0];
  updateDisplay();
  lapsContainer.innerHTML = "";
  localStorage.removeItem("laps");
}

function lap() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let lapTime = `${h}:${m}:${s}`;
  let li = document.createElement("li");
  li.innerText = "Lap - " + lapTime;
  lapsContainer.appendChild(li);

  let laps = JSON.parse(localStorage.getItem("laps")) || [];
  laps.push(lapTime);
  localStorage.setItem("laps", JSON.stringify(laps));
}

function loadLaps() {
  let laps = JSON.parse(localStorage.getItem("laps")) || [];
  laps.forEach((lapTime) => {
    let li = document.createElement("li");
    li.innerText = "Lap - " + lapTime;
    lapsContainer.appendChild(li);
  });
}

function toggleDarkMode() {
  if (!themeToggle || !modeLabel) return;

  if (themeToggle.checked) {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
    modeLabel.innerText = "Dark Mode ON";
  } else {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
    modeLabel.innerText = "Dark Mode OFF";
  }
}
