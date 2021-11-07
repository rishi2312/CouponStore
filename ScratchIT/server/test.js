import express from 'express'
import multer from 'multer'
import path from 'path'
import cors from 'cors'

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const imageUpload = multer({
    storage: imageStorage
})


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.get('/', (req, res) => {
    res.json({ msg: path.resolve() })
})

app.post('/upload', imageUpload.single('image'), (req, res) => { //imageUpload.single("image"),
    // console.log(req.file)
    console.log(req.file.filename)
    res.json(req.body)
})

app.listen(8021, () => {
    console.log('listening port 8021');
})