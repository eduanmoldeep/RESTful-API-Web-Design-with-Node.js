import express from 'express'

const app = express()

app.get('/authors', (req, res) => {
  const authors = [
    { id: 1, name: 'Margaret Atwood' },
    { id: 2, name: 'Philip Roth' },
    { id: 3, name: 'Toni Morrison' },
  ]
  res.status(200).json({ authors })
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
