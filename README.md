# ☀️ Weather App

A modern, responsive weather application built with React, TypeScript, and Vite. Features real-time weather data, auto-geolocation, 24-hour forecasts, and beautiful animations powered by Framer Motion.

## 🌐 Live Preview

**[View Live Demo →](https://weather-app-visual-crossing-api.vercel.app/)**

## ✨ Features

- 🌍 **Location Search**: Search for weather in any city worldwide
- 📍 **Auto-Geolocation**: Automatically detects your current location on first load
- 🌡️ **Current Weather**: Displays temperature, wind speed, humidity, visibility, and feels-like temperature
- ⏰ **24-Hour Forecast**: View hourly weather data with interactive timeline
- 🔄 **Refresh**: Manually refresh weather data with one click
- 🎨 **Beautiful UI**: Modern glass-morphism design with smooth animations
- 📱 **Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Fast**: Built with Vite for lightning-fast development and builds

## 🚀 How It Works

The app uses the **Visual Crossing Weather API** to fetch real-time weather data. It features:

1. **Auto-geolocation**: On initial load, the app requests browser geolocation permission and fetches weather for your current location
2. **Location Search**: Users can search for any location (city, area, country) to get weather data
3. **Custom Hook**: The `useWeather` hook manages all weather-related state and API calls
4. **Axios Interceptors**: Automatic API key injection, request logging, and error handling
5. **TypeScript**: Full type safety with strongly-typed API responses
6. **Component Architecture**: Clean separation of concerns with reusable components

## 🛠️ Tech Stack

- **React 19.2.0** - UI framework
- **TypeScript** - Type safety and better DX
- **Vite** - Build tool and dev server
- **Axios** - HTTP client with interceptors
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, customizable icons
- **Tailwind CSS** - Utility-first styling
- **Visual Crossing Weather API** - Real-time weather data



## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MuhammadYasinSaleem/Weather-app-visual-crossing-api.git
   cd Weather-app-visual-crossing-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_WEATHERAPI_KEY=your_api_key_here
   VITE_BASE_URL=https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline
   ```

   To get your free API key:
   - Visit [Visual Crossing Weather](https://www.visualcrossing.com/weather-api)
   - Sign up for a free account
   - Copy your API key and paste it in the `.env` file

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
weather-app/
├── src/
│   ├── api/
│   │   ├── axiosInstance.ts    # Axios configuration with interceptors
│   │   └── weather.ts           # Weather service with API methods
│   ├── components/
│   │   ├── LocationSearch.tsx   # Location search input component
│   │   ├── WeatherCard.tsx      # Current weather display card
│   │   └── ForecastTimeline.tsx # 24-hour forecast timeline
│   ├── hooks/
│   │   └── useWeather.ts        # Custom hook for weather data fetching
│   ├── types/
│   │   └── weather.types.ts     # TypeScript type definitions
│   ├── utils/
│   │   └── weatherHelpers.ts    # Helper utilities and error handling
│   ├── App.tsx                  # Main application component
│   ├── App.css                  # Application styles
│   ├── index.css                # Global styles
│   └── main.tsx                 # Application entry point
├── .env                         # Environment variables (not in git)
├── .env.example                 # Environment variables template
├── package.json
└── README.md
```

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_WEATHERAPI_KEY` | Your Visual Crossing API key | ✅ Yes |
| `VITE_BASE_URL` | Base URL for the Weather API | ✅ Yes |

## 🌐 API Usage

The app uses the Visual Crossing Weather API with the following configuration:

- **Endpoint**: `/timeline/{location}/{startDate}/{endDate}`
- **Unit Group**: `metric` (Celsius, km/h)
- **Include**: `hours,current,days`
- **Date Range**: 24 hours backward + 24 hours forward (48 hours total)

### Example API Call:
```typescript
const data = await weatherService.getWeather('London');
```

### API Methods:
- `getWeather(location)` - Get complete weather data (current + hourly)
- `getCurrentWeather(location)` - Get only current weather conditions
- `getHourlyForecast(location, hours)` - Get hourly forecast data

## 🧩 Components

### LocationSearch
Search input with auto-complete functionality and animated interactions.

### WeatherCard
Displays current weather conditions including:
- Temperature and "feels like" temperature
- Weather icon based on conditions
- Wind speed
- Humidity
- Visibility
- Today's high/low temperatures
- Precipitation amount
- UV index

### ForecastTimeline
Horizontal scrollable timeline showing 24-hour forecast with:
- Hourly time stamps
- Weather icons
- Temperature per hour
- Precipitation probability

## 🎨 Styling

The app uses a modern dark theme with:
- Glass-morphism effects (`backdrop-blur`)
- Gradient backgrounds
- Smooth transitions and animations
- Responsive grid layouts
- Hover effects for interactive elements

## 🧪 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📝 Code Quality

- **No console.log statements** in production code
- **Type-safe** with TypeScript strict mode
- **Modular components** under 150 lines
- **Clean architecture** with separation of concerns
- **Error handling** with custom error classes
- **Loading states** for better UX

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🐛 Troubleshooting

### API Key Issues
- Ensure your API key is correctly set in `.env`
- Restart the dev server after changing environment variables
- Check that you haven't exceeded the free tier rate limit (1000 requests/day)

### Geolocation Not Working
- Grant location permissions in your browser
- The app will fallback to New York if geolocation is denied
- Use the search bar to manually enter a location

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Ensure you're using Node.js version 16 or higher
- Check that all TypeScript types are correctly imported
