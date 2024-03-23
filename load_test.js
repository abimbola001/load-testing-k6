import { Counter } from 'k6/metrics';
import http from 'k6/http';
import { check, sleep } from 'k6';

// Define a custom metric
let errorCounter = new Counter('errors');

export let options = {
    thresholds: {
        errors: ['count<10'], // Define threshold for custom metric
    }
};

export default function () {
    // Make an HTTP GET request
    let res = http.get('https://test-api.k6.io/public/crocodiles/1/');

    // Check if the response is successful
    let success = check(res, {
        'status is 200': (r) => r.status === 200,
    });

    // Increment custom metric if there's an error
    if (!success) {
        errorCounter.add(1);
    }

    sleep(1);
}

// Generate HTML report programmatically after test execution
export function handleSummary(data) {
    return {
        'stdout': k6HtmlReport(data, { output: 'out/report.html' }),
    };
}
