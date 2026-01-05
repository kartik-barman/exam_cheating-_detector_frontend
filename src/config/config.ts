const NODE_ENV: "LOCAL" | "PROD" = "PROD";

const LOCAL_API_BASE_URL = "http://127.0.0.1:8000/api/v1/monitoring";
const PROD_API_BASE_URL =
  "https://examcheating-detector-backend.onrender.com/api/v1/monitoring";

export const API_BASE_URL =
  String(NODE_ENV) === "PROD" ? PROD_API_BASE_URL : LOCAL_API_BASE_URL;
