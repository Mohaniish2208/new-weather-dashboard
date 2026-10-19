import { fetchWeatherApi } from "openmeteo"

export async function getWeather(latitude: number, longitude: number) {
  const response = await fetchWeatherApi("https://api.open-meteo.com/v1/forecast", {
    latitude,
    longitude,
    current: ["temperature_2m", "apparent_temperature"],
    daily: ["temperature_2m_max", "temperature_2m_min"],
    temperature_unit: "celsius",
    timezone: "auto",
  })

  const current = response[0]?.current()
  const temperature = current?.variables(0)?.value()
  const feelsLike = current?.variables(1)?.value()
  const daily = response[0]?.daily()
  const high = daily?.variables(0)?.valuesArray()?.[0]
  const low = daily?.variables(1)?.valuesArray()?.[0]

  if (temperature == null || !Number.isFinite(temperature)) {
    throw new Error("temperature value is unavailable.")
  }

  if (feelsLike == null || !Number.isFinite(feelsLike)) {
    throw new Error("Feels-like temperature is unavailable.")
  }

  if (high == null || !Number.isFinite(high)) {
    throw new Error("Today's high temperature is not available.")
  }

  if (low == null || !Number.isFinite(low)) {
    throw new Error("Today's low temperature is not available.")
  }

  return { temperature, feelsLike, high, low }
}
