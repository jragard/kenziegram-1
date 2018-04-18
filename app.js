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

const path = './public/uploads';

app.use(express.static('./public/uploads'));
app.use(express.static('./public'));
app.set('view engine', 'pug');
app.use(express.json());

app.get('/', (req, res) => {
    fs.readdir(path, (err, items) => {
        res.render('index', {title: 'Kenzigram', images: items});
    });
});

app.post('/latest', (req, res) => {
    console.log(req.body)
    fs.readdir(path, (err, items) => {
        var response = {
            "images": [],
            "timestamp": 0,
        };
        items.forEach(item => {
            var modified = fs.statSync(path).mtimeMs;
            if(modified > req.body.after) {
                if(item != ".DS_Store") {
                response.images.push(item);
                response.timestamp = modified;
                }
            } 
        })
        res.send(response);
    })  
});

app.post('/upload', upload.single('pic'), (req, res, next) => {
    res.render('upload');
});




app.listen(port);