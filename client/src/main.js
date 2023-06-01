const express = require('express');
const serveStatic = require('serve-static');

const app = express();

// Hantera statiska filer
app.use(serveStatic('www'));

// Starta servern
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servern körs på port ${port}`);
});