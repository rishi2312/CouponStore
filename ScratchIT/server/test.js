import cron from "node-cron";
import Coupons from "./models/Coupons.js";
import mongoose from 'mongoose'
import couponRoutes from "./routes/couponRoutes.js";
import updateExpired from "./scheduler/expiredUpdateScheduler.js";
// cron.schedule("*/10 * * * * * *", () => checkForExpired());

const _updateExpired = () => {
    let count = 0
    const coupons = Coupons.find({ isAvailable: true })
        .then(data => {
            let curr_date = new Date()
            data.forEach(d => {
                if (d.dateExpiry <= curr_date) {

                    const newObj = Object.assign(d, { ...d, isAvailable: false, dateUpdated: new Date() })
                    Coupons.updateOne({ _id: newObj._id }, newObj).then(count++).catch(err => console.log(err))
                }
            })
            console.log(`records updated => ${count}`)
        })
        .catch(e => console.log(e))

}

const countDates = () => {
    let count = 0;
    let curr_date = new Date()
    Coupons.find({ isAvailable: true })
        .then(data => {
            data.forEach(d => {
                if (d.dateExpiry <= curr_date)
                    count++;
            })
            console.log(`records updated : ${count}`);
        })
        .catch(err => console.log(err))
}

mongoose.connect("mongodb+srv://new_user:qwertyuiop@cluster0.lkcul.mongodb.net/MyDatabase?retryWrites=true&w=majority&ssl=true",
    { useNewUrlParser: true }, () => {
        console.log('db connected')
    }
)

console.log('first')
cron.schedule('*/5 * * * * *', () => updateExpired())
