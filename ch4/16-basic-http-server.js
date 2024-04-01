import http from 'node:http'

const server = http.createServer(requestHandler)

function requestHandler(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Node.js server\n')
}

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000')
})
