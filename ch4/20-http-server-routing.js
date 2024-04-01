import http from 'node:http'

const server = http.createServer(requestHandler)

function requestHandler(req, res) {
  const { method, url } = req
  let responseMessage

  // Router
  if (url === '/authors' && method === 'GET') {
    res.statusCode = 200
    // Code to login user ...
    responseMessage = 'List of authors: JK Rowling, JRR Tolkien, Frank Herbert'
  } else if (url === '/books' && method === 'GET') {
    res.statusCode = 200
    // Code to get list o books ...
    responseMessage = 'List of books: Harry Potter, Lord of the Rings, Dune'
  } else if (url === '/purchase' && method === 'POST') {
    res.statusCode = 200
    // Code to purchase book ...
    responseMessage = 'Book purchased successfully'
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
