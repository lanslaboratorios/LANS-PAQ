var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(__dirname))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})
if (app.get('env== "development"')) {
  app.listen(3000, function () {
    console.log('Example listening on port 3000!')
  })
} else {
  app.listen(3001, function () {
    console.log('listening on port 3001!')
  })
}
module.exports = app
