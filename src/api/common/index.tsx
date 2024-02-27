const host = process.env.API_HOST || 'http://localhost:8000/api';
const ws_host = process.env.WS_HOST || 'ws://localhost:8000';
export const apiHost = host;
export const wsHost = ws_host;
