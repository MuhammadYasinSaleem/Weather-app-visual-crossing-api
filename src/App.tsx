import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import WeatherCard from './components/WeatherCard';
import LocationSearch from './components/LocationSearch';
import ForecastTimeline from './components/ForecastTimeline';
import { useWeather } from './hooks/useWeather';
import './App.css';

function App() {
  const { weatherData, loading, error, fetchWeather, refresh } = useWeather(true);

  const handleLocationSearch = async (searchLocation: string) => {
    await fetchWeather(searchLocation);
  };

  const handleRefresh = async () => {
    await refresh();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 py-8"
      >
        {/* Header */}
        <motion.div initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-balance">Weather</h1>
              <p className="text-slate-400">Real-time weather data at your fingertips</p>
            </div>
            {weatherData && (
              <motion.button
                onClick={handleRefresh}
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-slate-700/50 hover:bg-slate-700 disabled:bg-slate-800 p-3 rounded-xl border border-slate-600/30 transition-colors"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Search */}
        <div className="mb-8">
          <LocationSearch onSearch={handleLocationSearch} isLoading={loading} />
        </div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-8 text-red-200"
          >
            {error}
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-slate-400 border-t-blue-400 rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-slate-300">Loading weather data...</p>
          </motion.div>
        )}

        {/* Weather Content */}
        {weatherData && !loading && (
          <>
            {/* Current Weather */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <WeatherCard weatherData={weatherData} />
            </motion.div>

            {/* 24-Hour Forecast */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ForecastTimeline hours={weatherData.days[0].hours} />
            </motion.div>
          </>
        )}
      </motion.div>
    </main>
  )
}

export default App
