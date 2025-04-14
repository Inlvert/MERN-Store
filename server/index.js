const http = require('http');
const app  = require('./app');
const {PORT} = require('./constants')


const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`server started on ${PORT}`)
})
