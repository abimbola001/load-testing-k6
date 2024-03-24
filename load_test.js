import http from "k6/http";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  thresholds: {
    //http_req_duration: ["p(95)<1000"],
    http_req_failed: ['rate<0.1'],     // Error rate should be less than 10%
  },
  //vus: 10,
  stages: [
    { duration: '2m', target: 100 },  // Ramp up to 500 virtual users over 2 minute
    { duration: '2m', target: 100 },  // Stay at 500 virtual users for 2 minutes
    { duration: '1m', target: 0 },   // Ramp down to 0 virtual users over 1 minute
  ],
};

export default function () {
  http.get("https://test-api.k6.io");
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
