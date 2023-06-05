const express = require('express');
const serveStatic = require('serve-static');
var ping = require('ping');

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