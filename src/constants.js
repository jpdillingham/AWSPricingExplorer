require('./dotenv').config();

export const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT || 3001;
export const BACKEND_URL = 'http://localhost:' + BACKEND_PORT;
