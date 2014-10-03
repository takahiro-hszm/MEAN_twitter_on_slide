'use strict';
var config = require('./environment');

var eeic2014 = require('./eeic2014.json');

//npmでtwitとntwitter入れた
var Twit = require('twit');
var twitter = require('ntwitter');

var twitter = new twitter({
 consumer_key: config.twitter.clientID,
 consumer_secret: config.twitter.clientSecret,
 access_token_key: config.twitter.clientAccessToken,
 access_token_secret: config.twitter.clientAccessSecret
});

var twit = new Twit({
  consumer_key: config.twitter.clientID,
 consumer_secret: config.twitter.clientSecret,
 access_token: config.twitter.clientAccessToken,
 access_token_secret: config.twitter.clientAccessSecret
});


// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/thing/thing.socket').register(socket);
}

module.exports = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  //クライアントが接続してきた際の挙動を記述
  socketio.on('connection', function (socket) {
    socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port :
            process.env.DOMAIN;

    socket.connectedAt = new Date();

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });

    // Call onConnect.
    onConnect(socket);
    console.info('[%s] CONNECTED', socket.address);
  });

  //ツイッターのストリームを開始してリスナーセット
  twitter.stream('statuses/filter', eeic2014,function(stream) {
    console.log('streaming start');
    stream.on('data', function (data) {
      socketio.sockets.emit('eeic2014',data.text);
      console.log(data.text);
    });
    stream.on('end', function (response) {
      // 切断された場合の処理
      console.log('twitterstream disconnected...');
    });
    stream.on('destroy', function (response) {
      // 接続が破棄された場合の処理
      console.log('twitterstream destroyed...');
    });
  });


};
