const express = require('express')
const next = require('next')
const cors = require('cors')
const dev = process.env.NODE_ENV !== 'production'
const port = process.argv[2].replace("$PORT", "3000");;
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()
  server.options('*', cors()) 
  
  server.use(express.static('public'))
  
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.post('/', function (req, res) {
    res.send('POST request to homepage')
  })
    
  server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})