const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    fs.readFile('C:\\VSCode projects\\FrontendBackend\\PR3WebSite\\Frontend\\index.html', 'utf8', (err, data) => {
        if (err) {
          res.status(500).send('Error reading HTML file');
        } else {
          res.send(data);
        }
    });
});

app.listen(port, () => {
    console.log(`Фронтэнд сервер запущен на ${port} порту`)
});