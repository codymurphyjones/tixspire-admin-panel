const dev = process.env.NODE_ENV !== 'production'
const port = process.argv[2].replace("$PORT", "3000");;
const app =  require('next')({ dev })
const handle = app.getRequestHandler()

const {RunServer} = require("tixpire-server");

console.log("Starting");
app.prepare()
.then(RunServer(handle, port))
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
}).finally(() => console.log("Server Started"));
