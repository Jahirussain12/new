async function getWeather() {
  const apiKey = "217b1c9a849082f077d9e9175d65c091";
  const city = document.getElementById("cityInput").value;
  const weatherResult = document.getElementById("weatherResult");
  const errorMessage = document.getElementById("errorMessage");

  if (!city) {
      errorMessage.textContent = "Please enter a city name.";
      weatherResult.style.display = "none";
      return;
  }

  try {
      const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();

      if (data.cod !== 200) {
          throw new Error(data.message);
      }

      document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
      document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
      document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;

      const iconCode = data.weather[0].icon;
      document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${iconCode}.png`;

      weatherResult.style.display = "block";
      errorMessage.textContent = "";
  } catch (error) {
      errorMessage.textContent = "Error: " + error.message;
      weatherResult.style.display = "none";
  }
}
