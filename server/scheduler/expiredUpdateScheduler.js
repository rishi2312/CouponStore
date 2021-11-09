import Coupons from "../models/Coupons.js"


/*  

this function finds the document with the propertyy isAvailable as true and check whether the property dateExpiry is less than current date or not.
if so... the documents are updated with isAvailable property as false and dateUpdated property as the current Date.

*/

const updateExpired = () => {
    let count = 0
    Coupons.find({ isAvailable: true })
        .then(coll => {
            coll.forEach(data => {
                let curr_date = new Date()
                if (data.dateExpiry < curr_date) {
                    const newObj = Object.assign(data, { ...data, isAvailable: !data.isAvailable, dateUpdated: new Date() })
                    // count++
                    Coupons.updateOne({ _id: newObj._id }, newObj)
                        .then(count++)
                        .catch(err => console.log(err))
                }
            })
            console.log(`Records updated: ${count}`);
        })
        .catch(err => console.log(err))
}

export default updateExpired
