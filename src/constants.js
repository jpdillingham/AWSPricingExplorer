require('./dotenv').config();

export const ROOT_URL = process.env.REACT_APP_ROOT_URL || 'http://localhost';
export const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT || 3001;
export const BACKEND_URL = ROOT_URL + ':' + BACKEND_PORT;
