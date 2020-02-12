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

  server.get('/jt', (req, res) => {
    const actualPage = '/jt' 
    app.render(req, res, actualPage)
})

server.get('/sam', (req, res) => {
  const actualPage = '/sam' 
  app.render(req, res, actualPage)
})

server.get('/mom', (req, res) => {
  const actualPage = '/mom' 
  app.render(req, res, actualPage)
})

server.get('/brittany', (req, res) => {
  const actualPage = '/brittany' 
  app.render(req, res, actualPage)
})

server.get('/dad', (req, res) => {
  const actualPage = '/dad' 
  app.render(req, res, actualPage)
})
  
  server.get('*/:sent', (req, res) => {
    return app.render(req, res, '/', { sent: req.params.sent })
  })
  
  server.get('*', (req, res) => {
    return handle(req, res)
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