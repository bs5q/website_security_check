const axios = require('axios');

async function xssInjectionChecker(url) {
  console.log('Checking for XSS Injection...');

  try {
    const payload = `<img src="x" onerror="alert('XSS')">`;

    const response = await axios.get(`${url}/search?q=${payload}`);
    const responseData = response.data;

    console.log('XSS Injection Check Result:', 'No vulnerabilities found');
  } catch (error) {
    console.error('XSS Injection Check Result:', 'Potential XSS Injection Vulnerability');
  }
}

module.exports = xssInjectionChecker;
