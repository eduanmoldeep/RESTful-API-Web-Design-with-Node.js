import express from 'express'
import createRateLimitMiddleware from './24-rate-limiter.js'

const router = express.Router()

/**
 * Database records
 */
const charges = [
  { id: 12345, amount: 100 },
  { id: 12346, amount: 30 },
  { id: 12347, amount: 42 },
]

/**
 * base path: /charges
 */
router.use(createRateLimitMiddleware(5))

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Charge created' })
})

router.post('/:id', (req, res) => {
  const id = Number(req.params.id)
  const { amount } = req.body

  const charge = charges.find((charge) => charge.id === id)

  if (!charge) {
    res.status(404).json({ message: 'Charge not found' })
    return
  }

  charge.amount = amount

  res.status(200).json({ message: 'Charge updated' })
})

router.get('/:id', (req, res) => {
  res.status(200).json({ message: 'Charge retrieved' })
})

router.get('/', (req, res) => {
  res.status(200).json({ message: 'All Charges retrieved' })
})

router.get('/search', (req, res) => {
  res.status(200).json({ message: 'Charge searched' })
})

export default router
