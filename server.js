//const express = require('express')
const next = require('next')
//const cors = require('cors')
const dev = process.env.NODE_ENV !== 'production'
const port = process.argv[2].replace("$PORT", "3000");;
const app = next({ dev })
const handle = app.getRequestHandler()

const {RunServer} = require("tixpire-server");

console.log(RunServer);

console.log("Starting");
app.prepare()
.then(RunServer(handle, port))
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
}).finally(() => console.log("Server Started"));



/*
app.prepare()
.then(() => {
  const server = express()
  console.log("Server init");
  server.options('*', cors()) 
  
  server.use(express.static('public'));
  
server.route('/ticketing/*').all(function (req, res) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    
    return serverHandler.ticketing(req,res);
  })
  
  
server.route('/api*').all(function (req, res) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    return serverHandler.api(req,res);
  })
    
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + port)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})*/