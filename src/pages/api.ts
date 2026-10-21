import { fetchWeatherApi } from "openmeteo"

export async function getWeather(latitude: number, longitude: number) {
  const response = await fetchWeatherApi("https://api.open-meteo.com/v1/forecast", {
    latitude,
    longitude,
    current: ["temperature_2m", "apparent_temperature", "weather_code"],
    daily: ["temperature_2m_max", "temperature_2m_min"],
    hourly: ["temperature_2m"],
    temperature_unit: "celsius",
    timezone: "auto",
  })

  const current = response[0]?.current()
  const temperature = current?.variables(0)?.value()
  const feelsLike = current?.variables(1)?.value()
  const weatherCode = current?.variables(2)?.value()
  const daily = response[0]?.daily()
  const hourly = response[0]?.hourly()
  const hourlyTemperatures = hourly?.variables(0)?.valuesArray()
  const high = daily?.variables(0)?.valuesArray()?.[0]
  const low = daily?.variables(1)?.valuesArray()?.[0]

  if (temperature == null || !Number.isFinite(temperature)) {
    throw new Error("temperature value is unavailable.")
  }

  if (feelsLike == null || !Number.isFinite(feelsLike)) {
    throw new Error("Feels-like temperature is unavailable.")
  }

  if (weatherCode == null || !Number.isFinite(weatherCode)) {
    throw new Error("Weather code is unavailable.")
  }

  if (high == null || !Number.isFinite(high)) {
    throw new Error("Today's high temperature is not available.")
  }

  if (low == null || !Number.isFinite(low)) {
    throw new Error("Today's low temperature is not available.")
  }

  if (hourlyTemperatures == null || hourly == null) {
    throw new Error("Hourly forecast is unavailable.")
  }

  const hourlyStart = Number(hourly.time())

  const hourlyInterval = hourly.interval()

  const hourlyForecast = Array.from(hourlyTemperatures, (temperature, index) => ({
    time: new Date((hourlyStart + index * hourlyInterval) * 1000),
    temperature,
  }))

  return { temperature, feelsLike, high, low, weatherCode, hourlyForecast }
}
