import { useEffect, useState } from "react"
import "../styles/skyBeam.css"
import "../styles/style.css"
import { getWeather, searchCities, type citySearchResult } from "./api"
import sunnyIcon from "../assets/sunny.svg"
import partlyCloudyIcon from "../assets/partly-cloudy.svg"
import weatherIcon from "../assets/weather-icon.svg"
import cloudyIcon from "../assets/cloudy.svg"
import rainIcon from "../assets/rain.svg"
import thunderstormIcon from "../assets/thunderstorm.svg"
import snow from "../assets/snow.svg"

export default function SkyBeam() {
  const [unit, setUnit] = useState<"C" | "F">("C")
  const [temperature, settemperature] = useState<number | null>(null)
  const [feelsLike, setFeelsLike] = useState<number | null>(null)
  const [weatherCode, setWeatherCode] = useState<number | null>(null)
  const [high, setHigh] = useState<number | null>(null)
  const [low, setLow] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [hourlyForecast, setHourlyForecast] = useState<{ time: Date; temperature: number; weatherCode: number }[]>([])
  const [dailyForecast, setDailyForecast] = useState<{ time: Date; high: number; low: number; weatherCode: number }[]>(
    [],
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResult, setSearchResult] = useState<citySearchResult[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<citySearchResult | null>(null)
  const [searchActive, setSearchActive] = useState(false)

  function handleSelectedCity(city: citySearchResult) {
    setSelectedCity(city)
    setSearchQuery([city.name, city.admin1, city.country].filter(Boolean).join(", "))
    setSearchResult([])
    setSearchError(null)
    setSearchActive(false)
  }

  useEffect(() => {
    const query = searchQuery.trim()

    setSearchResult([])
    setSearchError(null)
    setSearchLoading(false)

    if (!searchActive || query.length < 2) return

    const controller = new AbortController()

    const timeoutId = window.setTimeout(async () => {
      setSearchLoading(true)

      try {
        const cities = await searchCities(query, controller.signal)

        if (controller.signal.aborted) return

        setSearchResult(cities)

        if (cities.length === 0) {
          setSearchError("No cities found.")
        }
      } catch (error) {
        if (controller.signal.aborted) return

        setSearchError(error instanceof Error ? error.message : "Unable to search for cities.")
      } finally {
        if (!controller.signal.aborted) {
          setSearchLoading(false)
        }
      }
    }, 200)

    return () => {
      window.clearTimeout(timeoutId)
      controller.abort()
    }
  }, [searchQuery, searchActive])

  function toggleUnit() {
    setUnit((current) => (current === "C" ? "F" : "C"))
  }

  useEffect(() => {
    let ignore = false

    async function loadWeather() {
      setLoading(true)
      setError(null)
      setHourlyForecast([])
      setDailyForecast([])

      try {
        const weather = await getWeather(selectedCity?.latitude ?? 43.6532, selectedCity?.longitude ?? -79.3832)
        const now = Date.now()
        const upcomingHours = weather.hourlyForecast.filter((entry) => entry.time.getTime() >= now).slice(0, 6)

        if (!ignore) {
          settemperature(weather.temperature)
          setFeelsLike(weather.feelsLike)
          setHigh(weather.high)
          setLow(weather.low)
          setWeatherCode(weather.weatherCode)
          setLastUpdated(new Date())
          setHourlyForecast(upcomingHours)
          setDailyForecast(weather.dailyForecast.slice(0, 5))
        }
      } catch (error) {
        if (!ignore) {
          setError(error instanceof Error ? error.message : "Unable to load the weather.")
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    void loadWeather()

    return () => {
      ignore = true
    }
  }, [selectedCity])

  const displayedtemperature = temperature === null ? null : unit === "F" ? temperature * (9 / 5) + 32 : temperature
  const displayedFeelsLike = feelsLike === null ? null : unit === "F" ? feelsLike * (9 / 5) + 32 : feelsLike
  const displayedHigh = high === null ? null : unit === "F" ? high * (9 / 5) + 32 : high
  const displayedLow = low === null ? null : unit === "F" ? low * (9 / 5) + 32 : low
  const weatherDescriptions: Record<number, string> = {
    0: "Clear Sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Light snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Light rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Light snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with light hail",
    97: "Heavy thunderstorm",
    99: "Thunderstorm with heavy hail",
  }
  const displayedCondition =
    loading || error || weatherCode === null ? "-" : (weatherDescriptions[weatherCode] ?? "Unknown conditions")

  const weatherIcons: Record<number, string> = {
    0: sunnyIcon,
    1: sunnyIcon,
    2: partlyCloudyIcon,
    3: cloudyIcon,
    45: cloudyIcon,
    48: cloudyIcon,
    51: rainIcon,
    53: rainIcon,
    55: rainIcon,
    56: rainIcon,
    57: rainIcon,
    61: rainIcon,
    63: rainIcon,
    65: rainIcon,
    66: rainIcon,
    67: rainIcon,
    71: snow,
    73: snow,
    75: snow,
    77: snow,
    80: rainIcon,
    81: rainIcon,
    82: rainIcon,
    85: snow,
    86: snow,
    95: thunderstormIcon,
    96: thunderstormIcon,
    97: thunderstormIcon,
    99: thunderstormIcon,
  }

  const displayedIcons = loading || error || weatherCode === null ? null : (weatherIcons[weatherCode] ?? null)
  const displayedDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: selectedCity?.timezone ?? "America/Toronto",
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date())

  const displayedLastUpdated =
    lastUpdated === null
      ? null
      : new Intl.DateTimeFormat("en-CA", {
          timeZone: selectedCity?.timezone ?? "America/Toronto",
          hour: "numeric",
          minute: "2-digit",
          timeZoneName: "short",
        }).format(lastUpdated)

  const hourlyTimeFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: selectedCity?.timezone ?? "America/Toronto",
    hour: "numeric",
    hour12: true,
  })

  const dailyDayFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "UTC",
    weekday: "short",
  })

  return (
    <main className="main-container">
      <div className="site-container">
        <div className="header">
          <img className="icon" src={weatherIcon} alt="SkyBeam Logo" />
          <div className="title-and-text">
            <h1 className="title">SkyBeam</h1>
            <div className="supportive-text-container">
              <div className="supportive-text-1">
                by <span className="supportive-text-2">Lifted</span>
              </div>
            </div>
          </div>
          <div className="city-search">
            <input
              className="searchbar"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value)
                setSearchActive(true)
              }}
              placeholder="Search for a city"
              aria-label="Search for a city"
              type="search"
              autoComplete="off"
            />

            {(searchLoading || searchError || searchResult.length > 0) && (
              <div className="search-dropdown">
                {searchLoading && <p role="status">Searching...</p>}

                {searchError && <p role="alert">{searchError}</p>}

                {searchResult.length > 0 && (
                  <ul className="unordered-list">
                    {searchResult.map((city) => (
                      <li className="city-list" key={city.id}>
                        <button className="button-list" type="button" onClick={() => handleSelectedCity(city)}>
                          {[city.name, city.admin1, city.country].filter(Boolean).join(", ")}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <div className="button-container">
            <button
              type="button"
              className={`unit-toggle ${unit === "F" ? "is-fahrenheit" : ""}`}
              onClick={toggleUnit}
              aria-label="Use Fahrenheit"
              aria-pressed={unit === "F"}
            >
              <span className="unit-slider" aria-hidden="true" />
              <span className="unit-label">°C</span>
              <span className="unit-label">°F</span>
            </button>
          </div>
        </div>
        <hr className="divider-header" />
      </div>
      <section className="section-container">
        <h1 className="city">
          {selectedCity ? [selectedCity.name, selectedCity.admin1].filter(Boolean).join(", ") : "Toronto, ON"}
        </h1>
        <div className="date">{displayedDate}</div>
        {!loading && !error && displayedLastUpdated !== null && (
          <p className="last-updated">Last updated {displayedLastUpdated}</p>
        )}
        <div className="weather-section">
          {displayedIcons !== null && <img className="weather-symbol" src={displayedIcons} alt={displayedCondition} />}
          <div className="degrees">
            {loading ? (
              <span className="loading-txt">{"Loading"}</span>
            ) : error ? (
              <span className="error-msg">{error}</span>
            ) : (
              `${displayedtemperature?.toFixed(0)}°${unit}`
            )}
          </div>
          <div className="description-container">
            <div className="description">{displayedCondition}</div>
            <div className="feels-like-container">
              <div className="feels-like">
                {loading || error || displayedFeelsLike === null
                  ? "Feels like -"
                  : `Feels Like ${displayedFeelsLike.toFixed(0)}°${unit}`}
              </div>
              <div className="dot">&#8226;</div>
              <div className="high">
                {loading || error || displayedHigh === null ? "High -" : `High ${displayedHigh.toFixed(0)}°${unit}`}
              </div>
              <div className="dot">&#8226;</div>
              <div className="low">
                {loading || error || displayedLow === null ? "Low -" : `Low ${displayedLow.toFixed(0)}°${unit}`}
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr className="divider-page" />
      <section className="today-section">
        <h1 className="today">Today</h1>

        <div className="hourly-container">
          {hourlyForecast.map((entry) => (
            <div className="present" key={entry.time.getTime()}>
              <div className="now">{hourlyTimeFormatter.format(entry.time)}</div>
              {weatherIcons[entry.weatherCode] && (
                <img
                  className="hourly-img"
                  src={weatherIcons[entry.weatherCode]}
                  alt={weatherDescriptions[entry.weatherCode] ?? "Unknown conditions."}
                />
              )}
              <div className="temperature">
                {(unit === "F" ? (entry.temperature * 9) / 5 + 32 : entry.temperature).toFixed(0)}°{unit}
              </div>
            </div>
          ))}
        </div>
      </section>
      <hr className="divider-page" />
      <section className="forecast-section">
        <div className="forecast-header">
          <div className="forecast-title">5-day forecast</div>
          <div className="hi-lo-section">
            <div className="high">High</div>
            <div className="low">Low</div>
          </div>
        </div>
        <hr className="sub-divider" />

        {dailyForecast.map((dayForecast, index) => (
          <div className="new-wrapper" key={dayForecast.time.getTime()}>
            <div className="today-sub-section">
              <div className="current-day">{index === 0 ? "Today" : dailyDayFormatter.format(dayForecast.time)}</div>
              <img
                className="weather-img"
                src={weatherIcons[dayForecast.weatherCode]}
                alt={weatherDescriptions[dayForecast.weatherCode] ?? "Unknown conditions"}
              />
              <div className="sub-weather">{weatherDescriptions[dayForecast.weatherCode] ?? "Unknown conditions"}</div>
              <div className="sub-hi">
                {(unit === "F" ? (dayForecast.high * 9) / 5 + 32 : dayForecast.high).toFixed(0)}°{unit}
              </div>
              <div className="sub-lo">
                {(unit === "F" ? (dayForecast.low * 9) / 5 + 32 : dayForecast.low).toFixed(0)}°{unit}
              </div>
            </div>
            <hr className="sub-divider" />
          </div>
        ))}
      </section>
      <hr className="divider-page" />
    </main>
  )
}
