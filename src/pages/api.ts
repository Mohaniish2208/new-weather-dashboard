import { fetchWeatherApi } from "openmeteo"

export async function getWeather(latitude: number, longitude: number) {
  const response = await fetchWeatherApi("https://api.open-meteo.com/v1/forecast", {
    latitude,
    longitude,
    current: ["temparature_2m"],
    temparature_unit: "celcius",
    timezone: "auto",
  })

  const current = response[0]?.current()
  const temparature = current?.variables(0)?.value()

  if (temparature == null || !Number.isFinite(temparature)) {
    throw new Error("Temparature value is unavailable.")
  }

  return { temparature }
}
