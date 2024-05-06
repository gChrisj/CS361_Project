const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer');
const fs = require('fs'); // Import the 'fs' module for file system operations


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))
// Create 'uploads' directory if it doesn't exist
const uploadDirectory = './uploads';
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Directory to store uploads
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use original filename
    }
});
// Create multer instance
const upload = multer({ storage: storage });

// POST endpoint to handle file upload
app.post('/upload', upload.single('file_upload'), (req, res) => {
    try {
        // Handle file upload logic here
        console.log('Uploaded file:', req.file);
        res.send('File uploaded successfully');
    } catch (error) {
        console.error('Error uploading file:', error.message); // Log the error message
        res.status(500).send('Error uploading file');
    }
});
const port = 5001
const server = app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})