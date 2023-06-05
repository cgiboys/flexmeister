const express = require('express');
const serveStatic = require('serve-static');
var ping = require('ping');
const https = require('https');

const app = express();

var CONFIG = require('./config.json');
var serverPort = CONFIG.sport
var serverIp = CONFIG.host
var clientPort = CONFIG.cport

// Hantera statiska filer
app.use(serveStatic('www'));

// Starta servern
const port = clientPort;
var hosts = [serverIp];
app.listen(port, () => {
  console.log(`Servern körs på port ${port}`);
  hosts.forEach(function (host) {
    ping.promise.probe(host)
        .then(function (res) {
            if (res.alive == true) {
              console.log(`conected to server on ${serverIp}:${serverPort}`);
            }
        });
});
});

https.get(serverIp + ":" + serverPort + "/api/alive", res => {
  let data = [];
  const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
  console.log('Status Code:', res.statusCode);
  console.log('Date in Response header:', headerDate);

  res.on('data', chunk => {
    data.push(chunk);
  });

  res.on('end', () => {
    console.log('Response ended: ');
    const users = JSON.parse(Buffer.concat(data).toString());

    for(user of users) {
      console.log(`Got user with id: ${user.id}, name: ${user.name}`);
    }
  });
}).on('error', err => {
  console.log('Error: ', err.message);
});