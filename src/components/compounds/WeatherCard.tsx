import { motion } from 'framer-motion';
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  Eye,
  CloudSnow,
} from 'lucide-react';
import type { VisualCrossingResponse } from '@customTypes/weather.types';

interface WeatherCardProps {
  weatherData: VisualCrossingResponse;
}

export default function WeatherCard({ weatherData }: WeatherCardProps) {
  const current = weatherData.currentConditions;
  const location = weatherData.resolvedAddress;
  const today = weatherData.days[0];

  const getWeatherIcon = (conditions: string) => {
    const lower = conditions.toLowerCase();
    if (lower.includes('rain')) {
      return <CloudRain className='w-24 h-24 text-blue-400' />;
    } else if (lower.includes('cloud')) {
      return <Cloud className='w-24 h-24 text-slate-300' />;
    } else if (lower.includes('snow')) {
      return <CloudSnow className='w-24 h-24 text-cyan-200' />;
    } else if (lower.includes('clear') || lower.includes('sunny')) {
      return <Sun className='w-24 h-24 text-yellow-400' />;
    }
    return <Sun className='w-24 h-24 text-yellow-400' />;
  };

  return (
    <div
      className='bg-gradient-to-br from-slate-800/80 to-slate-700/80
      backdrop-blur-xl rounded-2xl p-8 border border-slate-600/30
      shadow-2xl'
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className='text-3xl font-bold mb-8 text-slate-100'>{location}</h2>

        <div className='flex items-center justify-between mb-8'>
          <div className='flex items-center'>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              {getWeatherIcon(current.conditions)}
            </motion.div>
            <div className='ml-8'>
              <div className='text-7xl font-bold text-white'>
                {Math.round(current.temp)}°
              </div>
              <p className='text-xl text-slate-300 mt-2'>
                {current.conditions}
              </p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className='bg-slate-700/50 rounded-xl p-4 border
            border-slate-600/20'
          >
            <div className='flex items-center gap-2 mb-2'>
              <Wind className='w-5 h-5 text-cyan-400' />
              <span className='text-slate-400 text-sm'>Wind Speed</span>
            </div>
            <p className='text-2xl font-semibold'>
              {Math.round(current.windspeed)} km/h
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className='bg-slate-700/50 rounded-xl p-4 border
            border-slate-600/20'
          >
            <div className='flex items-center gap-2 mb-2'>
              <Droplets className='w-5 h-5 text-blue-400' />
              <span className='text-slate-400 text-sm'>Humidity</span>
            </div>
            <p className='text-2xl font-semibold'>
              {Math.round(current.humidity)}%
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className='bg-slate-700/50 rounded-xl p-4 border
            border-slate-600/20'
          >
            <div className='flex items-center gap-2 mb-2'>
              <Eye className='w-5 h-5 text-purple-400' />
              <span className='text-slate-400 text-sm'>Visibility</span>
            </div>
            <p className='text-2xl font-semibold'>
              {current.visibility !== null
                ? `${Math.round(current.visibility)} km`
                : 'N/A'}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className='bg-slate-700/50 rounded-xl p-4 border
            border-slate-600/20'
          >
            <div className='flex items-center gap-2 mb-2'>
              <Cloud className='w-5 h-5 text-slate-300' />
              <span className='text-slate-400 text-sm'>Feels Like</span>
            </div>
            <p className='text-2xl font-semibold'>
              {Math.round(current.feelslike)}°
            </p>
          </motion.div>
        </div>

        <div className='mt-8 pt-8 border-t border-slate-600/30'>
          <h3 className='text-sm font-semibold text-slate-400 mb-4'>
            TODAY&apos;S SUMMARY
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div>
              <p className='text-slate-400 text-sm mb-1'>High / Low</p>
              <p className='text-xl font-semibold'>
                {Math.round(today.tempmax)}° / {Math.round(today.tempmin)}°
              </p>
            </div>
            <div>
              <p className='text-slate-400 text-sm mb-1'>Precipitation</p>
              <p className='text-xl font-semibold'>
                {Math.round(today.precip || 0)} mm
              </p>
            </div>
            <div>
              <p className='text-slate-400 text-sm mb-1'>UV Index</p>
              <p className='text-xl font-semibold'>{today.uvindex}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
