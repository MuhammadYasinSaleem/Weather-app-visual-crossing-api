import { useState, useEffect, useCallback } from 'react';
import { weatherService } from '@api';
import type { VisualCrossingResponse } from '@types';

interface UseWeatherResult {
  weatherData: VisualCrossingResponse | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (location: string) => Promise<void>;
  fetchWeatherByCoordinates: (lat: number, lon: number) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useWeather(autoGeolocate: boolean = true): UseWeatherResult {
  const [weatherData, setWeatherData] = useState<VisualCrossingResponse | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastLocation, setLastLocation] = useState<string>('');

  const fetchWeather = useCallback(async (location: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await weatherService.getWeather(location);
      setWeatherData(data as any);
      setLastLocation(location);
    } catch (err: any) {
      const errorMessage =
        err.message || 'Failed to fetch weather data. Please try again.';
      setError(errorMessage);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByCoordinates = useCallback(
    async (lat: number, lon: number) => {
      const formattedLat = lat.toFixed(4);
      const formattedLon = lon.toFixed(4);
      const location = `${formattedLat},${formattedLon}`;
      await fetchWeather(location);
    },
    [fetchWeather],
  );

  const refresh = useCallback(async () => {
    if (lastLocation) {
      await fetchWeather(lastLocation);
    }
  }, [lastLocation, fetchWeather]);

  useEffect(() => {
    if (autoGeolocate && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(latitude, longitude);
        },
        () => {
          fetchWeather('New York');
        },
      );
    }
  }, [autoGeolocate, fetchWeather, fetchWeatherByCoordinates]);

  return {
    weatherData,
    loading,
    error,
    fetchWeather,
    fetchWeatherByCoordinates,
    refresh,
  };
}
