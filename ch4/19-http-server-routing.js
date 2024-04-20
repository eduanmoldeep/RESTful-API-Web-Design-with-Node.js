import http from 'node:http'

const server = http.createServer(requestHandler)

function requestHandler(req, res) {
  const { method, url: path } = req
  let responseMessage

  // Router
  if (method === 'GET' && path === '/authors') {
    res.statusCode = 200
    // Code to get list of authors ...
    responseMessage = 'List of authors: JK Rowling, JRR Tolkien, Frank Herbert'
  } else if (method === 'GET' && path === '/books') {
    res.statusCode = 200
    // Code to get list of books ...
    responseMessage = 'List of books: Harry Potter, Lord of the Rings, Dune'
  } else if (method === 'POST' && path === '/purchase') {
    res.statusCode = 200
    // Code to purchase book ...
    responseMessage = 'Book successfully purchased'
  } else {
    res.statusCode = 404
    responseMessage = 'Resource not found'
  }

  res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' })
  res.end(responseMessage)
}

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000')
})
