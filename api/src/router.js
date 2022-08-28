const { Router } = require('express')
const multer = require('multer')
const { route } = require('../app')
const router = Router()

const filename = function (request, file, callback) {
    callback(null, file.originalname)
}
const storage = multer.diskStorage({
    destination: 'api/uploads/',
    filename: filename
})
const fileFilter = function (request, file, callback) {
    if (file.mimetype === 'image/png') {
        request.fileValidationError = 'Wrong file type';
        callback(null, true, Error('Wrong file type'));
    } else {
        callback(null, false)
    }
}
const upload = multer({
    fileFilter: fileFilter,
    storage: storage,
})

router.post('/upload', upload.single('photo'), function(request, response) {
    if (request.fileValidationError) {
        return response.status(400).json({
            error: request.fileValidationError
        });
    } else {
        return response.status(201).json({
            success: true
        })
    }
})

module.exports = router;