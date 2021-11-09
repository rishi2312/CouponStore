import multer from 'multer'

const allowedTypes = ["jpeg", "JPG", "jpg", "JPEG", "png", "PNG"]


// initializing the diskStorage.. 
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
})


// Initializing filter to allow only images
const filter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype.split('/')[1]))
        cb(null, true)
    else cb(new Error("Please upload Image files"), false)
}


// Final image upload Engine
export const imageUpload = multer({
    storage: imageStorage,
    fileFilter: filter
})