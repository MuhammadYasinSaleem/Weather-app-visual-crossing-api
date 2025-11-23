import { motion } from 'framer-motion';
import { Cloud, CloudRain, Sun, CloudSnow } from 'lucide-react';
import type { HourData } from '../types/weather.types';

interface ForecastTimelineProps {
  hours: HourData[];
}

export default function ForecastTimeline({ hours }: ForecastTimelineProps) {
  const getHourlyIcon = (conditions: string) => {
    const lower = conditions.toLowerCase();
    if (lower.includes('rain')) {
      return <CloudRain className="w-6 h-6 text-blue-400" />;
    } else if (lower.includes('cloud')) {
      return <Cloud className="w-6 h-6 text-slate-300" />;
    } else if (lower.includes('snow')) {
      return <CloudSnow className="w-6 h-6 text-cyan-200" />;
    } else if (lower.includes('clear') || lower.includes('sunny')) {
      return <Sun className="w-6 h-6 text-yellow-400" />;
    }
    return <Sun className="w-6 h-6 text-yellow-400" />;
  };

  // Display up to 24 hours
  const displayHours = hours.slice(0, 24);

  return (
    <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/30 shadow-2xl">
      <h3 className="text-xl font-bold mb-6 text-slate-100">24-Hour Forecast</h3>
      <div className="overflow-x-auto">
        <div className="flex gap-3 pb-2">
          {displayHours.map((hour, index) => {
            // Parse the datetime - it comes as "HH:MM:SS"
            const timeString = hour.datetime;
            const [hours, minutes] = timeString.split(':');
            const hour24 = parseInt(hours, 10);
            const hour12 = hour24 % 12 || 12;
            const ampm = hour24 >= 12 ? 'PM' : 'AM';
            const displayTime = `${hour12}:${minutes} ${ampm}`;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.08, y: -5 }}
                className="flex-shrink-0 bg-slate-700/50 rounded-xl p-4 border border-slate-600/20 min-w-24 text-center hover:bg-slate-700/70 transition-colors cursor-pointer"
              >
                <p className="text-xs font-semibold text-slate-300 mb-3">{displayTime}</p>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.1 }}
                  className="flex justify-center mb-3"
                >
                  {getHourlyIcon(hour.conditions)}
                </motion.div>
                <p className="text-lg font-bold text-white mb-2">{Math.round(hour.temp)}°</p>
                <p className="text-xs text-slate-400">{Math.round(hour.precipprob)}%</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
