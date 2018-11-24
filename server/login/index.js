var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');
var multer = require('multer');


router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const uuidv4 = require('uuid/v4')

let ws;

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', express.static('client/login'));

// define the about route
router.post('/', function (req, res) {
  console.log("Who logged in: " + req.body.name);
  ws.send("" + req.body.name + " logged in for team (" + req.body.team + ")"); // type = LOGIN_STATUS
  res.redirect('/controller?client_id=' + uuidv4());
})

module.exports = {
  setWS: function(wss) {
    wss.on('connection', (newWs, req) => {
      ws = newWs;
    })
  },
  router
}