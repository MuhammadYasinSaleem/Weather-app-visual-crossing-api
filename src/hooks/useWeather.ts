import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@store/index';
import { fetchWeather as fetchWeatherThunk } from '@store/weatherSlice';
import {
  selectWeatherData,
  selectWeatherLoading,
  selectWeatherError,
  selectLastLocation,
} from '@store/weatherSlice';
import type { VisualCrossingResponse } from '@customTypes/weather.types';

interface UseWeatherResult {
  weatherData: VisualCrossingResponse | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (location: string) => Promise<void>;
  fetchWeatherByCoordinates: (lat: number, lon: number) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useWeather(autoGeolocate: boolean = true): UseWeatherResult {
  const dispatch = useAppDispatch();
  const weatherData = useAppSelector(
    selectWeatherData,
  ) as VisualCrossingResponse | null;
  const loading = useAppSelector(selectWeatherLoading);
  const error = useAppSelector(selectWeatherError);
  const lastLocation = useAppSelector(selectLastLocation);

  const fetchWeather = useCallback(
    async (location: string) => {
      await dispatch(fetchWeatherThunk(location)).unwrap();
    },
    [dispatch],
  );

  const fetchWeatherByCoordinates = useCallback(
    async (lat: number, lon: number) => {
      const formattedLat = lat.toFixed(4);
      const formattedLon = lon.toFixed(4);
      const location = `${formattedLat},${formattedLon}`;
      await dispatch(fetchWeatherThunk(location)).unwrap();
    },
    [dispatch],
  );

  const refresh = useCallback(async () => {
    if (lastLocation) {
      await dispatch(fetchWeatherThunk(lastLocation)).unwrap();
    }
  }, [lastLocation, dispatch]);

  useEffect(() => {
    if (autoGeolocate && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(latitude, longitude);
        },
        () => {
          fetchWeather('Lahore');
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
