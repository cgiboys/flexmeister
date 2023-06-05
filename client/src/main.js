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

app.get('/api/menu', (req, res) => {
  res.json(generateMenu());
});
