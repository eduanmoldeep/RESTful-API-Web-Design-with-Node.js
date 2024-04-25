fetch('http://localhost:3000/purchase', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Kane Hooper',
    creditCardNumber: '1234 5678 9012 3456',
    expiryDate: '12/24',
    bookId: 1,
  }),
})
