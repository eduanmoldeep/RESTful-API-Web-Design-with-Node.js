import http from 'node:http'

// Middleware functions
function logger(req, res) {
  const { method, url: path } = req
  console.log(`Request method: ${method} path: ${path}`)
}

// Router
const router = [
  { path: '/authors', method: 'GET', fn: getAuthors },
  { path: '/books', method: 'GET', fn: getBooks },
  { path: '/purchase', method: 'POST', fn: purchaseBook },
]

// Route handlers
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

// Error handling
function missingRoute(req, res) {
  res.statusCode = 404
  res.end('Resource not found')
}

// Request handler
function requestHandler(req, res) {
  const { method, url: path } = req

  const middleware = []
  middleware.push({ fn: logger })
  middleware.push(...router)
  middleware.push({ fn: missingRoute })

  for (const layer of middleware) {
    if (!layer.path && !layer.method) {
      layer.fn(req, res)
    } else if (layer.path === path && layer.method === method) {
      layer.fn(req, res)
    }
    if (res.finished) {
      break
    }
  }
}

const server = http.createServer(requestHandler)

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000')
})
