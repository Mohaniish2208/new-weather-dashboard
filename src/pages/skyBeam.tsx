import "../styles/skyBeam.css"
import "../styles/style.css"

export default function SkyBeam() {
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
        </div>
      </div>
    </main>
  )
}
