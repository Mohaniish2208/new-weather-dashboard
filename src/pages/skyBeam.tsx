import { useEffect, useState } from "react"
import "../styles/skyBeam.css"
import "../styles/style.css"
import { getWeather } from "./api"

export default function SkyBeam() {
  const [unit, setUnit] = useState<"C" | "F">("C")
  const [temperature, settemperature] = useState<number | null>(null)
  const [feelsLike, setFeelsLike] = useState<number | null>(null)
  const [high, setHigh] = useState<number | null>(null)
  const [low, setLow] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  function toggleUnit() {
    setUnit((current) => (current === "C" ? "F" : "C"))
  }

  useEffect(() => {
    let ignore = false

    async function loadWeather() {
      try {
        const weather = await getWeather(43.6532, -79.3832)

        if (!ignore) {
          settemperature(weather.temperature)
          setFeelsLike(weather.feelsLike)
          setHigh(weather.high)
          setLow(weather.low)
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
  }, [])

  const displayedtemperature = temperature === null ? null : unit === "F" ? temperature * (9 / 5) + 32 : temperature
  const displayedFeelsLike = feelsLike === null ? null : unit === "F" ? feelsLike * (9 / 5) + 32 : feelsLike
  const displayedHigh = high === null ? null : unit === "F" ? high * (9 / 5) + 32 : high
  const displayedLow = low === null ? null : unit === "F" ? low * (9 / 5) + 32 : low

  return (
    <main className="main-container">
      <div className="site-container">
        <div className="header">
          <img className="icon" src="../src/assets/weather-icon.svg" alt="icon" />
          <div className="title-and-text">
            <h1 className="title">SkyBeam</h1>
            <div className="supportive-text-container">
              <div className="supportive-text-1">
                by <span className="supportive-text-2">Lifted</span>
              </div>
            </div>
          </div>
          <input className="searchbar" placeholder="Search the city" type="form" />
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
        <h1 className="city">Toronto, ON</h1>
        <div className="date">Monday, November 15</div>
        <div className="weather-section">
          <img className="weather-symbol" src="../src/assets/partly-cloudy.svg" alt="weather-symbol" />
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
            <div className="description">Partly Cloudy</div>
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
          <div className="present">
            <div className="now">Now</div>
            <img className="hourly-img" src="../src/assets/partly-cloudy.svg" />
            <div className="temperature">20°</div>
          </div>
          <div className="present-plus-1">
            <div className="now">1 pm</div>
            <img className="hourly-img" src="../src/assets/cloudy.svg" />
            <div className="temperature">20°</div>
          </div>
          <div className="present-plus-2">
            <div className="now">2 pm</div>
            <img className="hourly-img" src="../src/assets/partly-cloudy.svg" />
            <div className="temperature">20°</div>
          </div>
          <div className="present-plus-3">
            <div className="now">3 pm</div>
            <img className="hourly-img" src="../src/assets/sunny.svg" />
            <div className="temperature">20°</div>
          </div>
          <div className="present-plus-4">
            <div className="now">4 pm</div>
            <img className="hourly-img" src="../src/assets/sunny.svg" />
            <div className="temperature">20°</div>
          </div>
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

        <div className="today-sub-section">
          <div className="current-day">Today</div>
          <img className="weather-img" src="../src/assets/partly-cloudy.svg" />
          <div className="sub-weather">Partly Cloudy</div>
          <div className="sub-hi">20°</div>
          <div className="sub-lo">17°</div>
        </div>
        <hr className="sub-divider" />

        <div className="sub-section">
          <div className="tuesday">Tue</div>
          <img className="weather-img" src="../src/assets/partly-cloudy.svg" />
          <div className="sub-weather">Partly Cloudy</div>
          <div className="sub-hi">20°</div>
          <div className="sub-lo">17°</div>
        </div>
        <hr className="sub-divider" />

        <div className="sub-section">
          <div className="wednesday">Wed</div>
          <img className="weather-img" src="../src/assets/partly-cloudy.svg" />
          <div className="sub-weather">Partly Cloudy</div>
          <div className="sub-hi">20°</div>
          <div className="sub-lo">17°</div>
        </div>
        <hr className="sub-divider" />

        <div className="sub-section">
          <div className="thursday">Thu</div>
          <img className="weather-img" src="../src/assets/partly-cloudy.svg" />
          <div className="sub-weather">Partly Cloudy</div>
          <div className="sub-hi">20°</div>
          <div className="sub-lo">17°</div>
        </div>
        <hr className="sub-divider" />

        <div className="sub-section">
          <div className="friday">Fri</div>
          <img className="weather-img" src="../src/assets/partly-cloudy.svg" />
          <div className="sub-weather">Partly Cloudy</div>
          <div className="sub-hi">20°</div>
          <div className="sub-lo">17°</div>
        </div>
        <hr className="sub-divider" />

        <div className="sub-section">
          <div className="saturday">Sat</div>
          <img className="weather-img" src="../src/assets/partly-cloudy.svg" />
          <div className="sub-weather">Partly Cloudy</div>
          <div className="sub-hi">20°</div>
          <div className="sub-lo">17°</div>
        </div>
        <hr className="sub-divider" />

        <div className="sub-section">
          <div className="sunday">Sun</div>
          <img className="weather-img" src="../src/assets/partly-cloudy.svg" />
          <div className="sub-weather">Partly Cloudy</div>
          <div className="sub-hi">20°</div>
          <div className="sub-lo">17°</div>
        </div>
      </section>
      <hr className="divider-page" />
    </main>
  )
}
