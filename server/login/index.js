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
  var client_id = uuidv4();
  console.log("Who logged in: " + username);
  
  global.users.push({name:username, team:userteam, client_id: client_id});
  var added = false;
  global.teams.forEach(element => {
    if (element.teamName === userteam) {
      element.members.push(username);
      added = true;
    }
  });
  if (!added) {
    global.teams.push({teamName:userteam, members:[username]});
  }

  try {
    ws.send("" + username + " logged in for team (" + userteam + ")");
  } catch(e) {
    console.log("Ooops, can't send to QR screen WS for username: " + username + " - continuing");
  }

  res.redirect('/controller?client_id=' + client_id);
})

module.exports = {
  setWS: function(wss) {
    wss.on('connection', (newWs, req) => {
      if(req.url === '/startup') {
        // console.log("New WS connection");
        ws = newWs;
        ws.on('close', function(event) {
          // console.log("Closing WS: " + event);
        });
        ws.on('error', function(event) {
          // console.log("Errored WS: " + event);
        });
        ws.on('message', function(event) {
          // console.log("Message: " + event);
        })
      };
    });
    // const interval = setInterval(function ping() {
    //   wss.clients.forEach(function each(ws) {
    //     if (ws.isAlive === false) {
    //       console.log("ws is not alive - terminating");
    //       return ws.terminate();
    //     }
    
    //     ws.isAlive = false;
    //     ws.ping(function() {}); // noop
    //   });
    // }, 30000);    
  },
  router
}