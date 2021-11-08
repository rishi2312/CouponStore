import express from 'express'
import { getAll, addBrand, getByBrandName, getByCategory } from '../controller/subCategoryController.js'


const subcatRoutes = express.Router()

subcatRoutes.get('/getall', getAll)
subcatRoutes.get('/get/:category', getByCategory)
subcatRoutes.post('/addbrand/:category', addBrand)
subcatRoutes.get('/:category/:brandName', getByBrandName)

export default subcatRoutes