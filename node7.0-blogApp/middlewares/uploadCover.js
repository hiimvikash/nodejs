const multer = require('multer');
const fs = require('fs'); // for dynamic directory creation




// Multer Saving configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationFolder = `public/uploads/${req.user._id}_${req.user.fullname}`;

        fs.mkdirSync(destinationFolder, { recursive: true }); // this will create destination folder if does'nt exist.

        cb(null, destinationFolder); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        // Save file with original name
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});
// Initialize multer upload middleware
const upload = multer({ storage: storage });
const uploadConfig = upload.single('coverImage');


module.exports = uploadConfig;