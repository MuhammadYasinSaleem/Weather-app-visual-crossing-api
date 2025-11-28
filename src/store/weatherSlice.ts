import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { weatherService } from '@/services/weather';
import type { WeatherData } from '@customTypes/weather.types';

interface WeatherState {
	data: WeatherData | null;
	loading: boolean;
	error: string | null;
	lastLocation: string | null;
}

const initialState: WeatherState = {
	data: null,
	loading: false,
	error: null,
	lastLocation: null,
};

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (location: string, thunkAPI) => {
	try {
		const data = await weatherService.getWeather(location);
		return data as WeatherData;
	} catch (err: any) {
		return thunkAPI.rejectWithValue(err?.message || 'Failed to fetch weather');
	}
});

const weatherSlice = createSlice({
	name: 'weather',
	initialState,
	reducers: {
		clearWeather(state) {
			state.data = null;
			state.error = null;
			state.lastLocation = null;
			state.loading = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWeather.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
					.addCase(fetchWeather.fulfilled, (state, action) => {
						state.loading = false;
						state.data = action.payload as WeatherData;
						state.lastLocation = (action.payload as any)?.location || state.lastLocation;
					})
			.addCase(fetchWeather.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.payload as string) || action.error.message || 'Failed to fetch weather';
			});
	},
});

export const { clearWeather } = weatherSlice.actions;

export default weatherSlice.reducer;

// Selectors
export const selectWeatherData = (state: any) => state.weather?.data as WeatherData | null;
export const selectWeatherLoading = (state: any) => state.weather?.loading as boolean;
export const selectWeatherError = (state: any) => state.weather?.error as string | null;
export const selectLastLocation = (state: any) => state.weather?.lastLocation as string | null;

