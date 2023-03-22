// require the installed packages 
const express = require('express')
const multer = require('multer');

// SET STORAGE
var storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() +'-' + file.originalname)
    }
})
var upload = multer({ storage: storage })

//CREATE EXPRESS APP 
const app = express();

//ROUTES WILL GO HERE 
app.post('/upload-single', upload.single('testImage'), (req, res) => {
    const file = req.file
    res.send({
        success: true,
        message:"File uploaded succesfully",
        data: file
    })
})

app.post('/upload-multiple', upload.array('testImages', 12), (req, res) => {
    const files = req.files
    res.send({
        success: true,
        message:"Files uploaded succesfully",
        data: files
    })
  })

// app.get('/', function (req, res) {
//     res.send("Hello World");
// });
app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
  });

app.listen(4000, () =>
    console.log('Server started on port 4000')
);