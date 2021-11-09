import mongoose from 'mongoose'
import Category from '../models/Catergory.js';
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

mongoose.connect(DB_CONNECT_STRING, { useNewUrlParser: true }, () => {
    Category.deleteMany({})
        .then(dummy_data.forEach(data => {
            const category = new Category({
                category: data,
                subcat: []
            })
            category.save().then().catch(e => console.log(e.toString))
        }))
        .catch(e => console.log(e))
    console.log('added')
});
