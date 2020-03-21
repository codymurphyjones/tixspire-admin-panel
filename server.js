const express = require('express')
const next = require('next')
const cors = require('cors')
const dev = process.env.NODE_ENV !== 'production'
const port = process.argv[2].replace("$PORT", "3000");;
const app = next({ dev })
const handle = app.getRequestHandler()
console.log("Starting");
app.prepare()
.then(() => {
  const server = express()
  console.log("Server init");
  server.options('*', cors()) 
  
  server.use(express.static('public'));
server.route('/api').all(function (req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    res.send('POST request to homepage');
    return handle(req, res);
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