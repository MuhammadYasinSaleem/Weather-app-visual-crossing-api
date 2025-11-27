import { motion } from "framer-motion";
import { Cloud, CloudRain, Sun, CloudSnow } from "lucide-react";
import type { DayData, HourData } from "../types/weather.types";

interface ForecastTimelineProps {
  days: DayData[];
  currentDateTime: string;
}

export default function ForecastTimeline({
  days,
  currentDateTime,
}: ForecastTimelineProps) {
  const getHourlyIcon = (conditions: string) => {
    const lower = conditions.toLowerCase();
    if (lower.includes("rain")) {
      return <CloudRain className="w-6 h-6 text-blue-400" />;
    } else if (lower.includes("cloud")) {
      return <Cloud className="w-6 h-6 text-slate-300" />;
    } else if (lower.includes("snow")) {
      return <CloudSnow className="w-6 h-6 text-cyan-200" />;
    } else if (lower.includes("clear") || lower.includes("sunny")) {
      return <Sun className="w-6 h-6 text-yellow-400" />;
    }
    return <Sun className="w-6 h-6 text-yellow-400" />;
  };

  const allHours: HourData[] = days.flatMap((day) => day.hours);

  const currentHour = parseInt(currentDateTime.split(":")[0], 10);

  let currentHourIndex = 0;
  for (let i = 0; i < allHours.length; i++) {
    const hourValue = parseInt(allHours[i].datetime.split(":")[0], 10);
    if (hourValue === currentHour) {
      currentHourIndex = i;
      break;
    }
  }

  const startIndex = Math.max(0, currentHourIndex - 24);
  const endIndex = Math.min(allHours.length, currentHourIndex + 24);
  const displayHours = allHours.slice(startIndex, endIndex);

  return (
    <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/30 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-100">48-Hour Timeline</h3>
        <p className="text-sm text-slate-400">24 hrs back · 24 hrs forward</p>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-3 pb-2">
          {displayHours.map((hour, index) => {
            const timeString = hour.datetime;
            const [hours, minutes] = timeString.split(":");
            const hour24 = parseInt(hours, 10);
            const hour12 = hour24 % 12 || 12;
            const ampm = hour24 >= 12 ? "PM" : "AM";
            const displayTime = `${hour12}:${minutes} ${ampm}`;

            const isPast = index < currentHourIndex - startIndex;
            const isCurrent = index === currentHourIndex - startIndex;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ scale: 1.08, y: -5 }}
                className={`flex-shrink-0 rounded-xl p-4 border min-w-24 text-center transition-colors cursor-pointer ${
                  isCurrent
                    ? "bg-blue-600/60 border-blue-400/50 ring-2 ring-blue-400/30"
                    : isPast
                      ? "bg-slate-700/30 border-slate-600/20 opacity-70 hover:bg-slate-700/50"
                      : "bg-slate-700/50 border-slate-600/20 hover:bg-slate-700/70"
                }`}
              >
                {isCurrent && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full font-semibold">
                      NOW
                    </span>
                  </div>
                )}
                <p
                  className={`text-xs font-semibold mb-3 ${
                    isCurrent
                      ? "text-blue-100"
                      : isPast
                        ? "text-slate-400"
                        : "text-slate-300"
                  }`}
                >
                  {displayTime}
                </p>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.1,
                  }}
                  className="flex justify-center mb-3"
                >
                  {getHourlyIcon(hour.conditions)}
                </motion.div>
                <p
                  className={`text-lg font-bold mb-2 ${
                    isCurrent
                      ? "text-white"
                      : isPast
                        ? "text-slate-300"
                        : "text-white"
                  }`}
                >
                  {Math.round(hour.temp)}°
                </p>
                <p className="text-xs text-slate-400">
                  {Math.round(hour.precipprob)}%
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
