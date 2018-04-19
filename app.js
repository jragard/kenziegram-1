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
        res.render('index', {title: 'Kenziegram', "images": items});
    });
});
latestResponse = {
    "latestImages": [],
    "timestamp": 0,
};

app.post('/latest', (req, res) => {
    fs.readdir(path, (err, items) => {
        items.forEach(item => {
            if(item != ".DS_Store") {
            var modified = fs.statSync(`./public/uploads/${item}`).mtimeMs;
            if(modified > req.body.after) {
                latestResponse.latestImages.push(item);
                }
                if (latestResponse.timestamp < modified) {  
                    latestResponse.timestamp = modified;
                    }   
            }
        })    
        res.send(JSON.stringify(latestResponse));
        latestResponse.latestImages = [];
    })  
});

app.post('/upload', upload.single('pic'), (req, res, next) => {
    res.render('upload');
});




app.listen(port);