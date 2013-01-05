var coffee = require('coffee-script')
  , server = require('./test/assets/server.coffee')

server.listen(process.argv[2] || 8642)