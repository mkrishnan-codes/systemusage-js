const AudioURL = "beep.mp3";
let COUNT = 1;
const audio = new Audio(AudioURL);
function playAudio(audioUrl = AudioURL) {
  audio.play();
}
function fetchCPUUsage() {
  fetch("/system-usage")
    .then((response) => response.json())
    .then((data) => {
      const now = new Date();
      const cpuUsageElement = document.getElementById("cpu-usage");
      cpuUsageElement.textContent = `${data.cpuUsagePercent.toFixed(2)}%`;
      //   const memUsageElement = document.getElementById("mem-usage");
      //   memUsageElement.textContent = `${data.memoryUsagePercent}`;
      const cpuInfo = document.getElementById("cpu-usage");
      
      
      
      // Alarm display
      const cpuChart = document.getElementById("cpu-usage-chart");
      cpuChart.classList.remove(["chart-r", "chart-y"]);
      cpuChart.style.width = `${data.cpuUsagePercent}%`;

      if (data.cpuUsagePercent >= 75) {
        cpuChart.classList.add("chart-r");
      }

      if (data.cpuUsagePercent > 50 && data.cpuUsagePercent < 75) {
        cpuChart.classList.add("chart-y");
      } 
      // Alarm voice
      if (
        data.cpuUsagePercent > 85
        // || data.memoryUsagePercent > 85
      ) {
        audio.play();
      }

      const timeElement = document.getElementById("time");
      timeElement.textContent = now.toLocaleString();
      const counter = document.getElementById("counter");
      counter.textContent = `Fetched ${COUNT++} times.`;
    })
    .catch((error) => console.error("Error fetching CPU usage:", error));
}

// Fetch CPU usage initially
fetchCPUUsage();

// Fetch CPU usage every 30 seconds
setInterval(fetchCPUUsage, 30000);

document.getElementById("checkButton")?.addEventListener("click", () => {
  fetchCPUUsage();
});
