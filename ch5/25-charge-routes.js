import express from 'express'

const app = express()

app.post('/charges', (req, res) => {
  res.status(201).json({ message: 'Charge created' })
})

app.post('/charges/:id', (req, res) => {
  res.status(200).json({ message: 'Charge updated' })
})

app.get('/charges/:id', (req, res) => {
  res.status(200).json({ message: 'Charge retrieved' })
})

app.get('/charges', (req, res) => {
  res.status(200).json({ message: 'All Charges retrieved' })
})

app.get('/charges/search', (req, res) => {
  res.status(200).json({ message: 'Charge searched' })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
