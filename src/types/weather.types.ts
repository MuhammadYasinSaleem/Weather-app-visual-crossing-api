export interface CurrentConditions {
  temp: number;
  windspeed: number;
  precipprob: number;
  conditions: string;
  feelslike: number;
  humidity: number;
  icon: string;
  datetime: string;
  visibility: number | null;
}

export interface HourData {
  datetime: string;
  temp: number;
  windspeed: number;
  precipprob: number;
  conditions: string;
  icon: string;
  feelslike: number;
  humidity: number;
}

export interface DayData {
  datetime: string;
  hours: HourData[];
  tempmax: number;
  tempmin: number;
  precip: number | null;
  uvindex: number;
}

export interface VisualCrossingResponse {
  resolvedAddress: string;
  latitude: number;
  longitude: number;
  timezone: string;
  days: DayData[];
  currentConditions: CurrentConditions;
}

export interface WeatherData {
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  timezone: string;

  current: {
    temp: number;
    windspeed: number;
    precipprob: number;
    conditions: string;
    feelslike: number;
    humidity: number;
    icon: string;
    datetime: string;
  };

  hours: {
    datetime: string;
    temp: number;
    windspeed: number;
    precipprob: number;
    conditions: string;
    icon: string;
    feelslike: number;
    humidity: number;
  }[];
}

export interface WeatherQueryParams {
  location: string;
  startDate?: string;
  endDate?: string;
  unitGroup?: "metric" | "us" | "uk";
  include?: string;
}

export interface WeatherError {
  message: string;
  status?: number;
  code?: string;
}
