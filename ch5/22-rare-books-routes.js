import express from 'express'
import morgan from 'morgan'
import createRateLimitMiddleware from './24-rate-limiter.js'

const app = express()

app.use(createRateLimitMiddleware(5))
app.use(express.json())
app.use(morgan('dev'))

const authors = [
  { id: 1, name: 'Margaret Atwood' },
  { id: 2, name: 'Philip Roth' },
  { id: 3, name: 'Toni Morrison' },
]

const books = [
  { id: 1, title: "The Handmaid's Tale", price: 10, stock: 0 },
  { id: 2, title: 'American Pastoral', price: 15, stock: 4 },
  { id: 3, title: 'Beloved', price: 20, stock: 7 },
]

app.get('/authors', (req, res) => {
  res.status(200)
  res.json(authors)
})

app.get('/books', (req, res) => {
  res.status(200).json(books)
})

app.post('/purchase', async (req, res) => {
  const { name, creditCardNumber, expiryDate, bookId } = req.body

  const book = books.find((book) => book.id === bookId)

  if (!book) {
    res.status(404).json({ message: 'Book not found' })
    return
  }

  if (book.stock <= 0) {
    res.status(409).json({ message: 'Not enough stock' })
    return
  }

  const response = await fetch('https://reqbin.com/echo/post/json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      creditCardNumber,
      expiryDate,
      price: book.price,
    }),
  })

  if (!response.ok) {
    res.status(400).json({ message: 'Payment failed' })
    return
  }

  book.stock--

  res.status(200).json({ message: 'Purchase successful' })
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
