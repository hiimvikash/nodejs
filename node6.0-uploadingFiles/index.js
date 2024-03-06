const path = require("path");
const express = require("express");
const multer = require('multer');

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({extended : false}));

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        // Save file with original name
        cb(null, file.originalname);
    }
});
// Initialize multer upload middleware
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  return res.render("home");
});

app.post("/upload", upload.single('profileImage'), (req, res)=>{
    console.log(req.file);
    res.render("home");
})

app.listen(PORT, () => console.log(`Server Started at PORT:8000`));
