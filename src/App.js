import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [locationInfo, setLocationInfo] = useState(''); // State to hold city, state, country info
  const [showDropdown, setShowDropdown] = useState(false); // Toggle for dropdown

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`;

  // List of 10 nature-themed images
  const themes = [
    { name: 'Forest', url: 'https://images.pexels.com/photos/338936/pexels-photo-338936.jpeg?cs=srgb&dl=pexels-nejc-kosir-108379-338936.jpg&fm=jpg' },
    { name: 'Mountains', url: 'https://images.pexels.com/photos/1324803/pexels-photo-1324803.jpeg?cs=srgb&dl=pexels-matthew-montrone-230847-1324803.jpg&fm=jpg' },
    { name: 'Beach', url: 'https://wallpapers.com/images/hd/4k-beach-with-rocks-kk5w1mi2o03y0r13.jpg' },
    { name: 'Desert', url: 'https://images8.alphacoders.com/790/790910.jpg' },
    { name: 'River', url: 'https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?cs=srgb&dl=pexels-samandgos-709552.jpg&fm=jpg' },
    { name: 'Waterfall', url: 'https://w0.peakpx.com/wallpaper/109/969/HD-wallpaper-waterfalls-forest-lovely-view-woods-beautiful-trees-tree-water-splendor-waterfall-peaceful-beauty-nature-river.jpg' },
    { name: 'Lake', url: 'https://wallpapers.com/images/hd/canberra-lake-burley-griffin-aucvg4btdyl1qls2.jpg' },
    { name: 'Sunset', url: 'https://i.pinimg.com/originals/7b/dc/e7/7bdce75d64ba8f75d7b71b14b23e411e.jpg' },
    { name: 'Snow', url: 'https://wallpapers.com/images/hd/4k-winter-background-p82jj1e0tzffkr65.jpg' },
    { name: 'Meadow', url: 'https://i.pinimg.com/736x/9f/7a/8f/9f7a8fbc8a1ca3df215ede5267542dcf.jpg' },
  ];

  const searchLocation = (event) => {
    if (event.key === 'Enter' && location) {
      axios.get(weatherUrl).then((response) => {
        setData(response.data);
        setLocationInfo(`${response.data.name}, ${response.data.sys.country}`); // City and country
        console.log('Weather data:', response.data);
      });
      setLocation('');
    }
  };

  const selectTheme = (url) => {
    setBackgroundImage(url);
    setShowDropdown(false); // Close dropdown after selection
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      {/* Logo */}
      <div className="search-container">
        <div className="logo">
          <h2>Z-Weather</h2>
        </div>
        <div className="search">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder="Enter Location"
            type="text"
          />
        </div>

        {/* Themes Button */}
        <button className="themes-btn" onClick={() => setShowDropdown(!showDropdown)}>
          Themes
        </button>

        {/* Dropdown for themes */}
        {showDropdown && (
          <div className="dropdown">
            {themes.map((theme, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => selectTheme(theme.url)}
              >
                <img src={theme.url} alt={theme.name} className="theme-icon" />
                <span>{theme.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="container">
        {/* Weather Details */}
        <div className="top">
          <div className="location">
            <p>{locationInfo}</p> {/* Display city, state, country */}
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {/* Bottom Weather Details */}
        {data.name && (
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 Zakarya Oukil. All rights reserved.</p>
        <p>Created by Zakarya Oukil</p>
      </footer>
    </div>
  );
}

export default App;
