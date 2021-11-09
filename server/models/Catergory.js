import mongoose from 'mongoose'

const CategorySchema = mongoose.Schema({
    category: String,
    subcat: mongoose.Schema.Types.Mixed
})

export default mongoose.model('categories', CategorySchema)