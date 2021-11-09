import Catergory from "../models/Catergory.js";
import mongoose from 'mongoose'

export const getAll = (req, res) => {
    Catergory.find()
        .then(data => res.json(data))
        .catch(e => res.json({ msg: e.toString() }))
}

export const addBrand = (req, res) => {
    Catergory.findOne({ category: req.params.category })
        .then(data => {
            if (data) {
                var exist = false;
                for (var i = 0; i < data.subcat.length; i++)
                    if (data.subcat[i].brandName === req.body.brandName) {
                        exist = true;
                        break;
                    }
                if (!exist) {
                    data.subcat.push(({
                        _id: mongoose.Types.ObjectId(),
                        brandName: req.body.brandName
                    }))
                    Catergory.updateOne({ category: data.category }, {
                        $set: {
                            subcat: category.subcat
                        }
                    }).then(res.json({ msg: "subcategory added" }))
                        .catch(e => res.json({ msg: e.toString() }))
                }
            } else { res.json({ msg: "subcategory existed" }) }
        })
        .catch(e => res.json({ msg: e.toString() }))
}

export const getByBrandName = async (req, res) => {
    Catergory.findOne({ category: req.params.category })
        .then(data => {
            if (data) {
                let brandNameExist = false;
                for (let i = 0; i < data.subcat.length; i++) {
                    if (data.subcat[i].brandName === req.params.brandName) {
                        brandNameExist = true;
                        break;
                    }
                }
                if (brandNameExist) {
                    res.json(data)
                } else {
                    data.subcat.push({ _id: mongoose.Types.ObjectId(), brandName: req.params.brandName })
                    Catergory.updateOne({ _id: data._id }, {
                        $set: {
                            subcat: data.subcat
                        }
                    }).then(() => {
                        Catergory.findOne({ _id: data._id }).then(d => res.json(d)).catch(e => res.json({ msg: e.toString() }))
                    }).catch(e => res.json({ msg: e.toString() }))
                }

            } else res.json({ msg: "undefined category" })
        })
        .catch(e => res.json({ msg: e.toString() }))
}

export const getByCategory = (req, res) => {
    Catergory.findOne({ category: req.params.category })
        .then(data => {
            if (data)
                res.json(data)
            else res.json({ msg: 'undefined category' })
        }).catch(e => res.json({ msg: e.toString() }))
}

export const getCouponType = async (category, brandName) => {
    const categoryData = await Catergory.findOne({ category: category })
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
        await Catergory.updateOne({ _id: categoryData._id }, {
            $set: {
                subcat: categoryData.subcat
            }
        })
        couponType += new_id
    } else couponType += categoryData.subcat[i]._id
    return couponType
}