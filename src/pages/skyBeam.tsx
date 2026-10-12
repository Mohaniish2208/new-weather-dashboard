import { useState } from "react"
import "../styles/skyBeam.css"
import "../styles/style.css"

export default function SkyBeam() {
  const [unit, setUnit] = useState<"C" | "F">("C")

  function toggleUnit() {
    setUnit((current) => (current === "C" ? "F" : "C"))
  }
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
      </div>
      <section className="section-container">
        <h1 className="city">Toronto, ON</h1>
        <div className="date">Monday, November 15</div>
        <div className="weather-section">
          <img className="weather-symbol" src="../src/assets/partly-cloudy.svg" alt="weather-symbol" />
          <div className="degrees">36°C</div>
          <div className="description-container">
            <div className="description">Partly Cloudy</div>
            <div className="feels-like">Feels like 30°</div>
            <div className="dot">&#8226;</div>
            <div className="high">High 36°</div>
            <div className="dot">&#8226;</div>
            <div className="low">Low 27°</div>
          </div>
        </div>
      </section>
      <section></section>
    </main>
  )
}
