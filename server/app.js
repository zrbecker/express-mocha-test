import Express from 'express'

const app = new Express()
app.get('/', (req, res) => {
  res.set({
    'Content-Type': 'text/plain',
  })
  res.send('hello world')
})

module.exports = app