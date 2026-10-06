import "../styles/skyBeam.css"

export default function SkyBeam() {
  return (
    <div className="site-container">
      <div className="header">
        <img className="icon" src="../src/assets/weather-icon.svg" alt="icon" />
        <h1 className="title">
          SkyBeam{" "}
          <span className="supportive-text-1">
            by <span className="supportive-text-2">Lifted</span>
          </span>
        </h1>
      </div>
    </div>
  )
}
