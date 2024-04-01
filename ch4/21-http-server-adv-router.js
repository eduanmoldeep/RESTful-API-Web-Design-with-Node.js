import http from 'node:http'

const server = http.createServer(requestHandler)

const router = [
  { url: '/authors', method: 'GET', fn: getAuthors },
  { url: '/books', method: 'GET', fn: getBooks },
  { url: '/purchase', method: 'POST', fn: purchaseBook },
]

function requestHandler(req, res) {
  const { method, url } = req

  const middleware = []
  middleware.push({ fn: logger })
  middleware.push(...router)
  middleware.push({ fn: missingRoute })

  for (const route of middleware) {
    if (!route.url && !route.method) {
      route.fn(req, res)
    } else if (route.url === url && route.method === method) {
      route.fn(req, res)
    }
    if (res.finished) {
      break
    }
  }
}

function logger(req, res) {
  console.log(`Request method: ${req.method} URL: ${req.url}`)
}

function getAuthors(req, res) {
  res.statusCode = 200
  res.end('List of authors: JK Rowling, JRR Tolkien, Frank Herbert')
}

function getBooks(req, res) {
  res.statusCode = 200
  res.end('List of books: Harry Potter, Lord of the Rings, Dune')
}

function purchaseBook(req, res) {
  res.statusCode = 200
  res.end('Book purchased successfully')
}

function missingRoute(req, res) {
  res.statusCode = 404
  res.end('Resource not found')
}

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000')
})
