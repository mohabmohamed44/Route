# Weather Forecast Website

## Overview
This website allows users to get real-time weather forecasts for any city they search for. It provides an intuitive interface to quickly access current weather conditions and forecasts.

## Features
- Search for weather information by city name
- Display current weather conditions
- Show multi-day weather forecast
- Responsive design for desktop and mobile devices

## Tech Stack
- **HTML**: Structure of the web pages (utilizing Bootstrap for responsive design)
- **CSS**: Styling of the website
  - Custom CSS variables for consistent color scheme and typography
- **JavaScript**: 
  - Handles user interactions
  - Fetches weather data from the API
  - Dynamically updates the DOM with weather information

## API Integration
This project uses the [Weather API](https://www.weatherapi.com/) to fetch weather data. You'll need to sign up for a free API key to use this service.

### Getting Your API Key
1. Visit [Weather API](https://www.weatherapi.com/)
2. Sign up for a free account
3. Navigate to your dashboard to find your API key
4. Add your API key to the JavaScript file (remember to keep it secret in production environments)

## Setup and Installation
1. Clone this repository to your local machine
2. Open `index.html` in your web browser
3. Make sure to add your Weather API key to the appropriate place in the JavaScript file

## Usage
1. Enter a city name in the search bar
2. Press enter or click the search button
3. View the current weather and forecast for the specified city

## Contributing
Contributions, issues, and feature requests are welcome. Feel free to check [issues page](link-to-your-issues-page) if you want to contribute.

## License
[MIT](https://choosealicense.com/licenses/mit/)