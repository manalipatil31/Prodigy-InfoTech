function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const resultDiv = document.getElementById('weatherResult');
  const loader = document.getElementById('loader');
  resultDiv.classList.add('hidden');
  loader.classList.remove('hidden');

  if (!city) {
    alert("Please enter a city name.");
    loader.classList.add('hidden');
    return;
  }

  const url = `https://goweather.herokuapp.com/weather/${city}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      loader.classList.add('hidden');

      if (!data.temperature || data.temperature === "") {
        resultDiv.innerHTML = "City not found or data unavailable.";
        resultDiv.classList.remove('hidden');
        return;
      }

      const icon = getWeatherIcon(data.description);
      let forecastHTML = "<h3>📅 Forecast</h3>";
      data.forecast.forEach(day => {
        forecastHTML += `<p>Day ${day.day}: ${day.temperature}, ${day.wind}</p>`;
      });

      resultDiv.innerHTML = `
        <h2>${icon} ${city.charAt(0).toUpperCase() + city.slice(1)}</h2>
        <p><strong>🌡️ Temperature:</strong> ${data.temperature}</p>
        <p><strong>🌥️ Description:</strong> ${data.description}</p>
        <p><strong>💨 Wind:</strong> ${data.wind}</p>
        ${forecastHTML}
      `;
      resultDiv.classList.remove('hidden');
    })
    .catch(error => {
      loader.classList.add('hidden');
      console.error("Error:", error);
      resultDiv.innerHTML = "Failed to fetch weather data.";
      resultDiv.classList.remove('hidden');
    });
}

function getWeatherIcon(desc) {
  const d = desc.toLowerCase();
  if (d.includes("clear") || d.includes("sun")) return "☀️";
  if (d.includes("cloud")) return "☁️";
  if (d.includes("rain")) return "🌧️";
  if (d.includes("storm")) return "⛈️";
  if (d.includes("snow")) return "❄️";
  return "🌈";
}

document.getElementById("toggleTheme").onclick = () => {
  document.body.classList.toggle("dark-mode");
};
