import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  vus: 20, // more virtual users
  duration: '1m', // longer test duration
  thresholds: {
    http_req_failed: ['rate<0.01'], // error rate should be less than 1%
    http_req_duration: ['p(99)<800'], // 99% of requests should be < 800ms
    http_reqs: ['count>200'], // How many total HTTP requests k6 generated
  },
}

export default function () {
  const url = 'https://automationexercise.com/api/productsList'
  const headers = {
    Vary: 'Accept',
  }
  const res = http.get(url, { headers })

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 800ms': (r) => r.timings.duration < 1800,
    'body contains products': (r) => r.body.includes('products'),
    // 'requestss generated >200': (r) => r.body.length > 200,
  })

  sleep(1)
}
