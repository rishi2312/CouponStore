import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Category from './models/Catergory.js'
import Coupons from './models/Coupons.js'
import e from 'express'
import { imageUpload } from './controller/uploadController.js'
const DB_CONNECT_STRING = // mongo db connection url
    "mongodb+srv://new_user:qwertyuiop@cluster0.lkcul.mongodb.net/MyDatabase?retryWrites=true&w=majority&ssl=true";


const dummy_data =
    ['Food & Dining',
        'Fashion',
        'Beauty & Health',
        'Travel',
        'Mobile & Tablets',
        'Electronic & Appliances',
        'Movies',
        'Computer, Laptop',
        'Home Furnishing',
        'Flower & Gifts',
        'Jewellery',
        'Sports & Fitness',
        'Camera & Accesories',
        'Kids & Toys',
        'Recharge',
        'Books & Stationary',
        'Web Hosting & Domain',
        'Online Classes/Course',
        'Automotive'
    ]


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.post('/addAll', (req, res) => {
    var count = 0
    dummy_data.forEach(data => {
        const category = new Category({
            category: data,
            subcat: []
        })
        category.save().then(count++).catch(e => console.log(e.toString))
    })
    res.send(`${count} records added`)
})

const getCouponType = async (category, brandName) => {
    const categoryData = await Category.findOne({ category: category })
    let couponType = categoryData._id + '_'
    let existBrandName = false, i = 0
    for (i = 0; i < categoryData.subcat.length; i++) {
        if (categoryData.subcat[i].brandName === brandName) {
            existBrandName = true
            break
        }
    }
    if (!existBrandName) {
        const new_id = mongoose.Types.ObjectId()
        categoryData.subcat.push({
            _id: new_id,
            brandName: brandName
        })
        await Category.updateOne({ _id: categoryData._id }, {
            $set: {
                subcat: categoryData.subcat
            }
        })
        couponType += new_id
    } else couponType += categoryData.subcat[i]._id
    return couponType
}

app.post('/coupons/add', imageUpload.single('image'), async (req, res) => {
    let couponType = await getCouponType(req.body.category, req.body.brandName)
    const coupon = new Coupons({
        dateExpiry: new Date(req.body.dateExpiry),
        couponType: couponType,
        couponCode: req.body.couponCode,
        fileName: req.file.filename,
    })
    coupon
        .save()
        .then(data => res.json(data))
        .catch(e => res.json({ msg: e.toString() }))
})


app.get('/', (req, res) => {
    const category = Category.find()
        .then(data => res.json(data))
        .catch(e => res.json({ msg: e.toString() }))
})




app.post('/add/:category', async (req, res) => {
    let category = await Category.findOne({ category: req.params.category })
    if (category) {
        var exist = false;
        for (var i = 0; i < category.subcat.length; i++)
            if (category.subcat[i].brandName === req.body.brandName) {
                exist = true;
                break;
            }
        if (!exist) {
            category.subcat.push(({
                _id: mongoose.Types.ObjectId(),
                brandName: req.body.brandName
            }))
            Category.updateOne({ _id: category._id }, {
                $set: {
                    subcat: category.subcat
                }
            }).then(data => res.json(data)).catch(e => res.json({ msg: e.toString() }))
        } else res.json({ msg: 'sub category exist' })

    }
})


app.delete('/deleteall', (req, res) => {
    Category.deleteMany({}).then(res.json({ msg: 'deleted' })).catch({ msg: e.toString() })
})

mongoose.connect(DB_CONNECT_STRING, { useNewUrlParser: true }, () => {
    console.log("Connected to database");
});

app.listen(8021, () => {
    console.log('listening port 8021');
})