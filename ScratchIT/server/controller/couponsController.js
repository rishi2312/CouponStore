import Coupons from "../models/Coupons.js";
import { getCouponType } from './subCategoryController.js'
export const getAll = (req, res) => {
  const coupons = Coupons.find()
    .then((data) => res.json(data))
    .catch((e) => res.json({ error: e.toString() }));
};

export const addCoupon = async (req, res) => {                                        // Adding a new coupon with provided details such as expiry date, date issued, coupon type, coupon code and the description 

  let couponType = await getCouponType(req.body.category, req.body.brandName)
  const coupon = new Coupons({
    dateExpiry: new Date(req.body.dateExpiry),
    couponType: couponType,
    couponCode: req.body.couponCode,
    fileName: req.file.filename,
  });

  coupon
    .save()
    .then((data) => res.json(data))
    .catch((e) => res.json({ error: e.toString() }));
};

export const getById = (req, res) => {
  Coupons.findById(req.params.couponId)
    .then((data) => res.json(data))
    .catch((e) => res.json({ error: e.toString() }));
};

export const delOne = (req, res) => {
  Coupons.findByIdAndDelete(req.params.couponId)
    .then(res.json({ msg: "success" }))
    .catch((e) => res.json({ error: e.toString() }));
};

export const claimed = (req, res) => {                                        // when claimed the property isAvailable will be set to false and the updated date and date claimed will be set by current date
  Coupons.updateOne(
    { _id: req.params.couponId },
    {
      $set: {
        isAvailable: false,
        dateClaimed: new Date(),
        dateUpdated: new Date(),
      },
    }
  )
    .then(res.json({ msg: "updated" }))
    .catch((e) => res.json({ error: e.toString() }));
};


export const deleteAll = (req, res) => {                                        // For TESTING purpose only..
  Coupons.deleteMany({})
    .then(res.json({ msg: 'all deleted' }))
    .catch(err => res.json({ error: err.toString() }))
  // res.json({ msg: 'deleted' })?
}

export const getAllAvailable = (req, res) => {
  Coupons.find({ isAvailable: true })
    .then(data => res.json(data))
    .catch(err => res.json({ error: err }))
}