import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
  stages: [
    { duration: '1m', target: 50 },  // Ramp up to 50 virtual users over 1 minute
    { duration: '3m', target: 50 },  // Stay at 50 virtual users for 3 minutes
    { duration: '1m', target: 0 },   // Ramp down to 0 virtual users over 1 minute
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% of requests must complete within 500ms
    http_req_failed: ['rate<0.1'],     // Error rate should be less than 10%
  },
};

export default function () {
  // Make an HTTP GET request to the specified URL
  const response = http.get('https://test-api.k6.io');
  
  // Simulate user think-time by sleeping for 1 second
  sleep(1);

  // Check for errors in the response and log them
  if (response.status !== 200) {
    console.error(`Error: ${response.status} - ${response.statusText}`);
  }

  export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
}

