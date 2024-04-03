import http from "k6/http";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { check } from 'k6';
//let errorCounter = new Counter('errorss');
export const options = {
  thresholds: {
    //http_req_duration: ["p(95)<1000"],
    //http_req_failed: ['rate<0.1'],     // Error rate should be less than 10%
  },
  
  stages: [
    { duration: '2m', target: 400 },  // below normal load
    { duration: '5m', target: 400 },
    { duration: '2m', target: 500 },  // normal load
    { duration: '5m', target: 500 },   
    { duration: '2m', target: 600 }, //beyond load
    { duration: '5m', target: 600 },
    { duration: '10m', target: 0 }, //scale down  Recovery stage
  ],
};

export default function () {
  http.get("https://test-api.k6.io");

  // Check response time
    check(response, {
        'Search Response Time is within threshold': (res) => res.timings.duration < 1000
    });

    // Check for errors
    check(response, {
        'Search Error Rate is within threshold': (res) => res.status === 200
    });

    // Measure throughput
    check(response, {
        'Search Throughput is within threshold': (response) => response.length > 0
    });

   
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };

  // Pause for a short duration to simulate user think time
    sleep(1);
}

export function teardown(data) {
  // Perform cleanup tasks here
  console.log("Teardown phase:");
  // Add code to log out users here
}
