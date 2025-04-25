const configData = import.meta.env;

const config = {};

try {
  config.weatherURL = configData.REACT_APP_API_BASE_URI || 'https://api.openweathermap.org/data/2.5/weather';
  config.ApiKey = configData.REACT_APP_FIREBASE_SEARCH_ID_URI || 'f33a484cf794d08d0148764789aaba32';
  config.currentLoc = configData.REACT_APP_CURRENT_LOC_URI || 'https://api.bigdatacloud.net/data/reverse-geocode-client';
} catch {
  config.weatherURL = 'https://api.openweathermap.org/data/2.5/weather';
  config.ApiKey = 'f33a484cf794d08d0148764789aaba32';
  config.currentLoc = 'https://api.bigdatacloud.net/data/reverse-geocode-client';
}

export default config;