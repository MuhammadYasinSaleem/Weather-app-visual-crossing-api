import type { WeatherError } from "../types/weather.types";

export class WeatherApiError extends Error {
  status?: number;
  code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = "WeatherApiError";
    this.status = status;
    this.code = code;

    if (typeof (Error as any).captureStackTrace === "function") {
      (Error as any).captureStackTrace(this, WeatherApiError);
    }
  }
}

export function formatWeatherError(error: unknown): WeatherError {
  if (error instanceof WeatherApiError) {
    return {
      message: error.message,
      status: error.status,
      code: error.code,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: "An unexpected error occurred while fetching weather data",
  };
}

export function validateLocation(location: string): boolean {
  if (!location || typeof location !== "string") {
    return false;
  }

  const trimmed = location.trim();
  return trimmed.length >= 2 && trimmed.length <= 100;
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getDateRange(): { startDate: string; endDate: string } {
  const now = new Date();
  const start = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const end = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  return {
    startDate: formatDate(start),
    endDate: formatDate(end),
  };
}

export function isApiKeyConfigured(): boolean {
  const apiKey = import.meta.env.VITE_WEATHERAPI_KEY;
  return !!apiKey && apiKey.length > 0;
}
