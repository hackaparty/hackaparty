var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', express.static('client/login'));

// define the about route
router.post('/', function (req, res) {
  res.send('About birds')
})

module.exports = router