import React, { useState, useEffect } from 'react';
import './App.css';

const WeatherApp = () => {
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              const apiKey = '5205556dc7c6f08a76c0b761b55cf071';
              const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
              
              const response = await fetch(apiUrl);
              const data = await response.json();

              if (response.ok) {
                setTemperature(data.main.temp);
              } else {
                setError('Failed to fetch weather data');
              }
            },
            (error) => {
              console.error('Error getting location:', error);
              setError('Failed to get location');
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
          setError('Geolocation is not supported by this browser.');
        }
      } catch (error) {
        console.error('Error fetching weather:', error);
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div>
      <h1>Weather App</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        temperature !== null && <p>Current Temperature of your location: {temperature}°C</p>
      )}
    </div>
  );
};

export default WeatherApp;