const express = require('express')
const app = express()

const taskOne = require('./task-one/index.js')

app.use('/task-one', taskOne)

// default
app.get('/', async (req, res) => {
  res.status(200).send(JSON.stringify({ message: 'Hello Tawk.to' }))
})

// env port
const port = process.env.PORT == '3232' ? process.env.PORT : ''

// start server
if (port) {
  app.listen(port, () => {
    console.log(`Server only on http://localhost:${port}`)
  })
}

// export default app
