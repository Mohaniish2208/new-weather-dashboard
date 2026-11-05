# SkyBeam

**A weather dashboard built with React, TypeScript, and Vite.**

SkyBeam brings current conditions, upcoming hourly temperatures, and a five-day forecast into one clean interface. Search for a city, check its local weather, and switch between Celsius and Fahrenheit.

## Features

- **City search** — find locations by name, with region and country details to help choose the right result.
- **Current conditions** — view temperature, feels-like temperature, weather description, and today's high and low.
- **Hourly outlook** — see the next six upcoming hourly forecasts with weather icons and temperatures.
- **Five-day forecast** — check daily conditions and high/low temperatures, starting with today.
- **Celsius and Fahrenheit** — switch units across the entire dashboard without fetching the forecast again.
- **Local time display** — view the date, hourly labels, and last-updated time in the selected city's time zone.
- **Loading and error states** — receive feedback while weather and search results load, or when a request fails.

The dashboard opens with **Toronto, Ontario** as its default location.

## Tech stack

| Technology | Purpose |
| --- | --- |
| React | Components, state, and effects |
| TypeScript | Typed application code and API data |
| Vite | Development server and production bundling |
| Open-Meteo SDK | Weather forecast requests |
| Fetch API | City search requests |
| CSS and SVG | Layout, styling, and weather icons |

## Getting started

### Prerequisites

- Node.js **20.19+ within version 20**, or **22.12+**, matching the installed Vite package's requirements.
- npm.
- An internet connection for weather data, city search, and Google Fonts.

### Run locally

```sh
git clone https://github.com/Mohaniish2208/new-weather-dashboard.git
cd new-weather-dashboard
npm ci
npm run dev
```

Open the local URL printed by Vite in your terminal.

**No API key or environment variables are required by the current implementation.** Requests go directly from the browser to Open-Meteo.

## Using the dashboard

1. Enter at least two characters in the city search field.
2. Select a result to load that location's weather.
3. Use the **°C / °F** toggle to change temperature units.
4. Browse the current conditions, hourly outlook, and five-day forecast.

Search waits briefly after typing before requesting up to five matches. Weather loads when the page opens and when a city is selected. The selected city and temperature unit are held in memory and reset when the page reloads.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev -- --host` | Start the Vite development server for viewing in multiple devices. |
| `npm run build` | Run TypeScript checks and create a production build in `dist/`. |
| `npm run preview` | Serve the production build locally for inspection. |

To build and preview:

```sh
npm run build
npm run preview
```

## Project structure

```text
src/
├── assets/                 # SVG weather icons and app icon
├── pages/
│   ├── api.ts              # City search, weather requests, and forecast data
│   └── skyBeam.tsx         # Dashboard UI and interaction logic
├── styles/
│   ├── fontsAndVars.css    # Font imports and CSS variables
│   ├── skyBeam.css         # Dashboard styles
│   └── style.css           # Global styles
├── App.tsx                 # Root application component
└── main.tsx                # React entry point
index.html                  # HTML entry point
```

## Weather data

SkyBeam uses Open-Meteo's forecast and geocoding services:

- Forecast endpoint: `https://api.open-meteo.com/v1/forecast`
- City search endpoint: `https://geocoding-api.open-meteo.com/v1/search`

Temperatures are requested in Celsius and converted in the interface when Fahrenheit is selected. Weather codes are mapped to descriptions and local SVG icons.

Weather data provided by [Open-Meteo](https://open-meteo.com/).

## Author

Created by [Mohaniish2208](https://github.com/Mohaniish2208).
