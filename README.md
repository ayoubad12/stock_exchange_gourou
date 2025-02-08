# Stock Exchange Guru 📈

A fun and interactive web application that generates AI-powered stock analysis reports with a humorous twist. The app allows users to input up to 3 stock tickers and receives an entertaining analysis report based on real market data.

## Features 🚀

- Input up to 3 stock tickers for analysis
- Real-time stock data fetching using the Polygon.io API
- AI-powered report generation using OpenAI's API
- Interactive UI with loading states and error handling
- Entertaining and casual writing style for stock predictions

## Architecture 🏗️

The application uses a modern web architecture with the following components:

- **Frontend**: Pure JavaScript, HTML, and CSS
- **API Layer**: Cloudflare Workers for handling API requests
  - `polygon-api-worker`: Handles stock data fetching from Polygon.io
  - `openai-api-worker`: Manages communication with OpenAI's API

### Data Flow

1. User inputs stock tickers
2. Application fetches 3-day historical data from Polygon.io via worker
3. Data is processed and sent to OpenAI API via worker
4. AI generates a fun, casual analysis report
5. Report is rendered to the user

## Setup and Installation 🛠️

1. Clone the repository

2. Navigate to the frontend folder and start a local server to serve the files.
```bash
# Using Python
python -m http.server

# Or using Node.js
npx serve
```

3. Open `http://localhost:8000` in your browser

## Usage 💡

1. Enter a stock ticker (minimum 3 characters) in the input field
2. Click the "+" button to add it to your list
3. Add up to 3 different tickers
4. Click "Generate Report" to get your AI-powered analysis
5. Wait for the magical prediction to appear! 🎯

## Sequence Diagram:
<img src="assets/sequence diagramme.jpg" alt="Sequence Diagram" width="800">

## Limitations ⚠️

- Maximum of 3 stock tickers per report
- Reports are generated based on 3-day historical data
- API rate limits is applied
- This is not real financial advice 

## Dependencies 📦

- Polygon.io API for stock data
- OpenAI API for report generation
- Google Fonts (Comic Neue, Poppins)

