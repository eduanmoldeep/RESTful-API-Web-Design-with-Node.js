import http from 'node:http'

const server = http.createServer(requestHandler)

function requestHandler(req, res) {
  const { method, url: path } = req
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end(
    `Node.js server\nHTTP request method: ${method}\nHTTP request path: ${path}\n`
  )
}

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000')
})
