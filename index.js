// index.js

// Step 1: Fetch Data from the API
// Fetch the weather data for the city entered by the user
async function fetchWeatherData(city) {
  const apiKey = 'your_api_key_here'; // Replace with your OpenWeather API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    // Show a loading message before the fetch request
    displayLoading(true);
    
    const response = await fetch(url);
    
    // Check if the response is successful (status code 200)
    if (!response.ok) {
      throw new Error('City not found');
    }

    // Parse the JSON response
    const data = await response.json();
    displayWeather(data); // Call the function to display weather data on the page
  } catch (error) {
    // Handle errors (e.g., invalid city name, network issues)
    displayError(error.message);
  } finally {
    // Hide the loading message after the request is complete
    displayLoading(false);
  }
}

// Step 2: Display Weather Data on the Page
// Update the DOM with weather details such as temperature, humidity, and description
function displayWeather(data) {
  const weatherDisplay = document.getElementById('weather-display');
  weatherDisplay.innerHTML = `
    <h2>Weather in ${data.name}, ${data.sys.country}</h2>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Weather: ${data.weather[0].description}</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;
}

// Step 3: Handle User Input
// Attach an event listener to the "Get Weather" button to capture the city name
document.getElementById('fetch-weather').addEventListener('click', () => {
  const city = document.getElementById('city-input').value.trim();
  if (city) {
    fetchWeatherData(city); // Fetch weather data for the entered city
  } else {
    displayError('Please enter a city name');
  }
});

// Step 4: Implement Error Handling
// Display error messages on the page if something goes wrong
function displayError(message) {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden'); // Make the error message visible
}

// Step 5: Show Loading Indicator
// Display a loading spinner or message while the API request is in progress
function displayLoading(isLoading) {
  const loadingElement = document.getElementById('loading');
  if (isLoading) {
    loadingElement.classList.remove('hidden'); // Show loading spinner or message
  } else {
    loadingElement.classList.add('hidden'); // Hide loading spinner or message
  }
}