const express = require('express');
const serveStatic = require('serve-static');;
const fetch = require('node-fetch');
const fs = require('fs');

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

});

function getTitleFromHTML(filePath) {
  const html = fs.readFileSync(filePath, 'utf-8');
  const match = /<title>(.*?)<\/title>/i.exec(html);
  return match && match[1];
}

function generateMenu() {
  const direktory = 'www/';
  const files = fs.readdirSync(direktory);

  const menuItems = files
    .filter(file => file.endsWith('.html'))
    .map(file => {
      const filePath = direktory + file;
      const title = getTitleFromHTML(filePath);
      return {
        title: title || 'Okänd sida',
        url: `/${file}`,
        id: file.substring(0,file.lastIndexOf('.html'))
      };
    });

  return menuItems;
}

app.get('/server/alive', (req, res) => {
  (async () => {
    try {
  
      const response = await fetch('http://' + serverIp + ':' + serverPort + '/api/alive');
      const json = await response.json()
      // console.log(json);
      return res.json(json);
    } catch (error) {
      return res.json({alive: false});
    }
  })();
});

app.get('/server/get-alltime-of-user', (req, res) => {
  (async () => {
    try {
      const response = await fetch('http://' + serverIp + ':' + serverPort + '/api/get-alltime-of-user?userId=' + req.query.userId);
      const json = await response.json()
      //console.log(json);
      //console.log(req.query.userId);
      //console.log("Från servern");
      return res.json(json);
    } catch (error) {
      console.log(error);
    }
  })();
});

app.get('/server/get-v-time-of-user', (req, res) => {
  (async () => {
    try {
      const response = await fetch('http://' + serverIp + ':' + serverPort + 
      '/api/get-v-time-of-user?userId=' + req.query.userId +
      '&week=' + req.query.week +
      '&year=' + req.query.year);
      const json = await response.json()
      return res.json(json);
    } catch (error) {
      console.log(error);
    }
  })();
});

app.get('/server/get-m-time-of-user', (req, res) => {
  (async () => {
    try {
      const response = await fetch('http://' + serverIp + ':' + serverPort + '/api/get-m-time-of-user?userId=' + req.query.userId + 
      '&month=' + req.query.month +
      '&year=' + req.query.year);
      const json = await response.json()
      console.log(json);
      return res.json(json);
    } catch (error) {
      console.log(error);
    }
  })();
});

app.get('/server/get-y-time-of-user', (req, res) => {
  (async () => {
    try {
      const response = await fetch('http://' + serverIp + ':' + serverPort + '/api/get-y-time-of-user?userId=' + req.query.userId +
      '&year=' + 2023);
      const json = await response.json()
      return res.json(json);
    } catch (error) {
      console.log(error);
    }
  })();
});

app.get('/server/get-total-flex-time-of-user', (req, res) => {
  (async () => {
    try {
      const response = await fetch('http://' + serverIp + ':' + serverPort + '/api/get-total-flex-time-of-user?userId=' + req.query.userId);
      const json = await response.json()
      //console.log("from server: " + json);
      return res.json(json);
    } catch (error) {
      console.log(error);
    }
  })();
});

app.get('/server/add-time-to-user', (req, res) => {
  (async () => {
    try {
      const response = await fetch('http://' + serverIp + ':' + serverPort + '/api/add-time-to-user' + 
      '?userId=' + req.query.userId + 
      '&time=' + req.query.time);
      const json = await response.json()
      //console.log(json);
      return res.json(json);
    } catch (error) {
      console.log(error);
    }
  })();
});

app.get('/server/del-item-with-id-from-user', (req, res) => {
  (async () => {
    try {
      const response = await fetch('http://' + serverIp + ':' + serverPort + '/api/del-item-with-id-from-user' + 
      '?userId=' + req.query.userId +
      '&itemId=' + req.query.itemId);
      const json = await response.json()
      //console.log(json);
      //console.log("From web: " + req.query.itemId);
      return res.json(json);
    } catch (error) {
      console.log(error);
    }
  })();
});

app.get('/server/edit-item-with-id-from-user', (req, res) => {
  (async () => {
    try {
      const response = await fetch('http://' + serverIp + ':' + serverPort + '/api/edit-item-with-id-from-user' + 
      '?userId=' + req.query.userId +
      '&itemId=' + req.query.itemId +
      '&newTime=' + req.query.newTime);
      const json = await response.json()
      //console.log(json);
      //console.log("From web: userId: " + req.query.userId + " itemId: " + req.query.itemId + " newTime: " + req.query.newTime);
      return res.json(json);
    } catch (error) {
      console.log(error);
    }
  })();
});

app.get('/api/menu', (req, res) => {
  res.json(generateMenu());
});
