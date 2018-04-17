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

app.use(express.static('./public/uploads'));
app.use(express.static('./public'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
const path = './public/uploads';
fs.readdir(path, (err, items) => {
    res.render('index', {title: 'Kenzigram', images: items});
});
});

app.post('/upload', upload.single('pic'), (req, res, next) => {
    res.render('upload');
});




app.listen(port);