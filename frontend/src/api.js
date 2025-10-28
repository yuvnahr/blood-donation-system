import axios from "axios";

// Change this to your Codespaces public backend URL
const API_BASE = "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE,
});
