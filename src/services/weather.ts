import axiosInstance from '../api/axiosInstance';
import type {
  WeatherData,
  VisualCrossingResponse,
  WeatherQueryParams,
} from '@customTypes/weather.types';
import {
  validateLocation,
  getDateRange,
  isApiKeyConfigured,
  WeatherApiError,
  formatWeatherError,
} from '@utils/weatherHelpers';

class WeatherService {
  async getWeather(
    location: string,
    options: Partial<WeatherQueryParams> = {},
  ): Promise<WeatherData> {
    if (!isApiKeyConfigured()) {
      throw new WeatherApiError(
        'API key not configured',
        401,
        'MISSING_API_KEY',
      );
    }

    if (!validateLocation(location)) {
      throw new WeatherApiError('Invalid location', 400, 'INVALID_LOCATION');
    }

    try {
      const { startDate, endDate } =
        options.startDate && options.endDate
          ? { startDate: options.startDate, endDate: options.endDate }
          : getDateRange();

      const url = `/${encodeURIComponent(location)}/${startDate}/${endDate}`;

      const response = await axiosInstance.get<VisualCrossingResponse>(url, {
        params: {
          unitGroup: options.unitGroup || 'metric',
          include: options.include || 'hours,current,days',
          contentType: 'json',
        },
      });

      return response.data as any;
    } catch (error) {
      const formattedError = formatWeatherError(error);
      throw new WeatherApiError(
        formattedError.message,
        formattedError.status,
        formattedError.code,
      );
    }
  }

  async getCurrentWeather(location: string) {
    const data = await this.getWeather(location, { include: 'current' });
    return {
      location: data.location,
      ...data.current,
    };
  }

  async getHourlyForecast(location: string, hours: number = 48) {
    const data = await this.getWeather(location, { include: 'hours' });
    return {
      location: data.location,
      hours: data.hours.slice(0, hours),
    };
  }
}

export const weatherService = new WeatherService();

export const getWeather = (
  location: string,
  options?: Partial<WeatherQueryParams>,
) => weatherService.getWeather(location, options);

export const getCurrentWeather = (location: string) =>
  weatherService.getCurrentWeather(location);

export const getHourlyForecast = (location: string, hours?: number) =>
  weatherService.getHourlyForecast(location, hours);

export type {
  WeatherData,
  WeatherQueryParams,
} from '@customTypes/weather.types';
