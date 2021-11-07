import mongoose from 'mongoose'


/*
    Schema model for individual Coupon
*/

const CouponsSchema = mongoose.Schema({
    dateAdded: {
        type: Date,
        required: true,
        default: new Date(),
    },
    dateExpiry: {
        type: Date,
        required: true,
    },
    couponType: {
        type: String,
        default: "others",
    },
    couponCode: {
        type: String,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    dateClaimed: {
        type: Date,
        default: null,
    },
    dateUpdated: {
        type: Date,
        default: null,
    },
    fileName: {
        type: String,
        required: true,
        default: null
    }
})

export default mongoose.model('Coupons', CouponsSchema)