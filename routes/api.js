const express = require("express")
const router = express.Router()
const  apiController = require('../controllers/apiControllers')
const { uploadsingle, uploadMultiple } = require("../helpers/multer");

// History
// http://localhost:3000/admin/history
router.get('/history', apiController.getAllhistory)
router.post('/history', apiController.addHistory)
router.delete('/history/:id', apiController.deleteHistory)
router.put('/history/:id', apiController.updateHistory)


// produk
router.get('/produk', apiController.getProduct)
router.post('/produk', uploadsingle, apiController.addProduct)
router.delete('/produk/:id', apiController.deleteProduk)
router.put('/produk/:id', uploadsingle, apiController.updateProduk)


// category
router.get('/category' , apiController.getCategory)
router.post('/category', apiController.addCategory)
router.delete('/category/:id', apiController.deleteCategory)
router.put('/category/:id', apiController.editCategory)


module.exports = router


