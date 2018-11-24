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

router.get('/users', function (req, res) {
  res.send(global.users);  
});

router.get('/teams', function (req, res) {
  res.send(global.teams);
})

// define the about route
router.post('/', function (req, res) {
  var username = req.body.name;
  var userteam = req.body.team;
  console.log("Who logged in: " + username);
  ws.send("" + username + " logged in for team (" + userteam + ")"); // type = LOGIN_STATUS
  global.users.push({name:username, team:userteam});
  var added = false;
  global.teams.forEach(element => {
    if (element.teamName === userteam) {
      element.members.push(username);
      added = true;
    }
  });
  if (!added) {
    global.teams.push({teamName:userteam, members:[username]})
  }
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