import axios from "axios";

// 👇 Use the same backend URL, but include the /api prefix
const API_BASE_URL = "https://lonely-spooky-graveyard-wr966x9qvp69f9vq-5000.app.github.dev/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
});
