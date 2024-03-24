import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // Key configurations for Stress in this section
  stages: [
    { duration: '2m', target: 80 },  // below normal load
    { duration: '5m', target: 80 },
    { duration: '2m', target: 90 },  // normal load
    { duration: '5m', target: 90 },   
    { duration: '2m', target: 100 }, //beyond load
    { duration: '5m', target: 100 },
    { duration: '10m', target: 0 }, //scale down  Recovery stage
  ],
};

export default () => {
  const urlRes = http.get('https://test-api.k6.io');
  sleep(1);
  // MORE STEPS
  // Here you can have more steps or complex script
  // Step1
  // Step2
  // etc.
};
