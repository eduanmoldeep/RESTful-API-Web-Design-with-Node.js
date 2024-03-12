const os = require('node:os') // Import the os module
const winston = require('winston')
const createRequestCounter = require('./4-rate-limiter.js') // Import the rate limiter

// Define the target URL and the interval in milliseconds
const targetUrl = 'https://httpbin.org/get'
const checkInterval = 10000 // 10 seconds
const maxRequestsPerMinute = 5

const rateLimiter = createRequestCounter(maxRequestsPerMinute)

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'application_status.log' }),
  ],
})

async function checkApplicationStatus() {
  if (rateLimiter.isRateLimited()) {
    logger.warn('Rate limit exceeded. Skipping check.')
    return
  }

  const response = await fetch(targetUrl)

  // Gather system information
  const uptime = os.uptime()
  const totalMemory = os.totalmem()
  const freeMemory = os.freemem()

  // Check if the status code is in the range of 200-299
  if (response.ok) {
    logger.info(
      `Application is up. Status code: ${response.status}. Uptime: ${uptime} seconds. Total memory: ${totalMemory} bytes. Free memory: ${freeMemory} bytes.`
    )
  } else {
    logger.warn(
      `Application is down or unreachable. Status code: ${response.status}. Uptime: ${uptime} seconds. Total memory: ${totalMemory} bytes. Free memory: ${freeMemory} bytes.`
    )
  }
}

// Run the check function every 10 seconds
setInterval(checkApplicationStatus, checkInterval)
