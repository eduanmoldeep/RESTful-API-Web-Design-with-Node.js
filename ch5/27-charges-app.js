import express from 'express'
import chargesRouter from './26-charges-router.js'

const app = express()

app.use('/charges', chargesRouter)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
