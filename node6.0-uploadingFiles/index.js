const path = require("path");
const express = require("express");
const multer = require('multer');
const fs = require('fs'); // for dynamic directory creation

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({extended : false}));

// Multer Saving configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationFolder = `uploads/${file.fieldname}`;

        fs.mkdirSync(destinationFolder, { recursive: true }); // this will create destination folder if does'nt exist.

        cb(null, destinationFolder); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        // Save file with original name
        cb(null, file.originalname);
    }
});


// Initialize multer upload middleware
const upload = multer({ storage: storage });

// 3 types of Uploading Configuration :-
    // const uploadConfig = upload.single('gallery'); // use this when you're uploading 1file from 1field
    // const uploadConfig = upload.array('gallery', 10); // use this when you're uploading >1 file from one field, atmost 10files at once.
    const uploadConfig = upload.fields([{name : "gallery", maxCount:2}, {name : "resume"}]); // use this when you're uploading files from >1 fields


app.post("/upload", uploadConfig , (req, res)=>{
    console.log(req.files); // if single file upload then req.file
    res.render("home");
})

app.get("/", (req, res) => {
    return res.render("home");
});


app.listen(PORT, () => console.log(`Server Started at PORT:8000`));
