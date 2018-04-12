const express = require('express');
const fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: (req, file, cb) => cb(null, file.originalname)
})
const upload = multer({ storage })

const app = express();

const port = 3000;

app.use(express.static('./public'));

app.get('/', (req, res) => {
const path = './public/uploads';
fs.readdir(path, (err, items) => {
    let imageDisplay = [];
    for (let i = 0; i < items.length; i++) {
        if (items[i] != ".DS_Store") {
        imageDisplay += `<img src= /uploads/${items[i]}>`;
    }}
    res.send(` <link rel="stylesheet" type="text/css" media="screen" href="app.css"/>
    <body>
    <h1>Kenziegram</h1>
    <form id= "uploadForm" action="http://localhost:3000/upload" enctype="multipart/form-data" method="POST">
        <input id="fileSelect" type="file" name="pic" accept="image/*">
        <input id="uploadBut" type="submit" value="Upload">
        
    </form>
    <div id="imageDisplay">${imageDisplay}</div>
</body>`);
});
});

app.post('/upload', upload.single('pic'), (req, res, next) => {
    res.send('<p id="uploadMessage">Uploaded photo! </p><form action="http://localhost:3000" method="get"><input type="submit" value="Return to gallery"></form>')}
    );




app.listen(port);