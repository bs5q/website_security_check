const axios = require('axios');
const readline = require('readline');
const sqlInjectionChecker = require('./sqlInjectionChecker');
const xssInjectionChecker = require('./xssInjectionChecker');

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function checkSecurityHeaders(url) {
  try {
    const response = await axios.head(url);
    const headers = response.headers;

    const securityHeaders = {
      "Content-Security-Policy": headers['content-security-policy'] || 'Not set',
      "X-Frame-Options": headers['x-frame-options'] || 'Not set',
      "X-Content-Type-Options": headers['x-content-type-options'] || 'Not set',
      "Strict-Transport-Security": headers['strict-transport-security'] || 'Not set',
      "Referrer-Policy": headers['referrer-policy'] || 'Not set',
    };

    displayResult('Security Headers:', securityHeaders);

    await sqlInjectionChecker(url);

    await xssInjectionChecker(url);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

function displayResult(title, data) {
  console.log(`\n${title}:`);
  for (const [key, value] of Object.entries(data)) {
    console.log(`${key}: ${value}`);
  }
  console.log('\n');
}

async function run() {
  const websiteDomain = await prompt('Enter the website domain (e.g., example.com): ');
  const url = `http://${websiteDomain}`;

  console.log(`Checking security headers for ${url}...\n`);
  await checkSecurityHeaders(url);
}

run();
