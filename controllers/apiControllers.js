const HistoryModel = require('../model/History')
const ProdukModel = require('../model/Produk')
const CategoryModel = require('../model/Category')
const fs = require('fs-extra')
const path = require('path')

module.exports = {
    getAllhistory: async(req,res) => {
        try {
            const data = await HistoryModel.getHIstory()
            res.json(data)
        } catch (error) {
            res.send(error.message)
            
        }
    },
    addHistory: async (req,res) => {
        try {
            const date = new Date()
            const {invoices, orders, amount} = req.body
            const data = await HistoryModel.InsertHistory(invoices, orders, amount, date)
            res.json(data)
        } catch (error) {
            res.send(error.message)
        }
    },

    deleteHistory: async (req,res) => {
        try {
             const { id } = req.params;
             const Del = await HistoryModel.deleteId(id)
             res.json(Del)
        } catch (error) {
            res.send(error.message)
        }
    },

    updateHistory: async (req,res) => {
        try {
            const {id} = req.params
            const {invoices, orders, amount} = req.body
            const Update = await HistoryModel.updateId(invoices, orders, amount, id)
            res.json(Update)
        } catch (error) {
            res.send(error.message)
        }
    },

    getProduct: async(req,res) => {
        try {
            const sort = !req.query.sort ? null : req.query.sort
            const by = !req.query.by? '' : req.query.by
            const search = !req.query.search? '' : req.query.search
            const dataAll = await ProdukModel.displayAll(sort, by, search)
            const limit = !req.query.limit ? 2 : parseInt(req.query.limit)
            const page = !req.query.page ? '' : parseInt(req.query.page)
            const totalpage = Math.ceil(dataAll.length/limit)
            if(!page){
               res.json(dataAll)
            } else {
                const offset = page === 1 ? 0 : (page - 1) * limit
                const Produk = await ProdukModel.getProduct(offset, limit)
                res.json({
                    totalRow: dataAll.length,
                    message: "suscess pagination",
                    totalpage: totalpage,
                    page: page,
                    data: Produk,
                }) 

            }
        } catch (error) {
            res.send(error.message)
        }
    },

    addProduct: async (req,res) => {
        try {
            const {id_category,title, harga} = req.body
            const image = req.file.filename
            console.log(image,title, harga)
            const add =  await ProdukModel.addPRoduct(title, harga, image, id_category)
            res.json(add)
        } catch (error) {
            res.status(500).send("error addd")
        }
    },

    deleteProduk: async (req,res) => {
        try {
            const {id} = req.params
            const finID = await ProdukModel.finOne(id)
            await fs.unlink(path.join(`public/images/${finID[0].image}`))
            const del = await ProdukModel.deleteProduk(id)
            res.json(del)
        } catch (error) {
            res.send(error.message)
        }
    },
    
    updateProduk: async (req,res) => {
        try {
            const { id } = req.params
            const { title, harga, id_category } = req.body;
            const finID = await ProdukModel.finOne(id)
            const image = !req.file ? finID[0].image : req.file.filename
           console.log(image)
            if (image === finID[0].image  ) {
                const Update = await ProdukModel.updateProduk(title, harga, image, id, id_category)
                res.json(Update)
            } else {
                await fs.unlink(path.join(`public/images/${finID[0].image}`))
                const upd = await ProdukModel.updateProduk(title, harga, image, id, id_category)
                res.status(200).json(upd)

            }
        } catch (error) {
            res.send(err.message)
        }
    },

    getCategory: async (req,res) => {
        try {
            res.json(getAll)
            const getAll = await CategoryModel.getCategory()
        } catch (error) {
            res.send(error.message)
        }
    },
    addCategory: async(req,res) => {
        try {
            const {nama_category} = req.body
            const insert = await CategoryModel.addCategory(nama_category)
            res.json(insert)
        } catch (error) {
            res.send(error.message)
        }
    },
    deleteCategory: async(req, res) => {
        try {
            const {id} = req.params
            const del = await CategoryModel.deleteCategory(id)
            res.json(del)
        } catch (error) {
            res.send(error.message)
        }
    },
    editCategory: async(req,res) => {
        try {
            const {id} = req.params
            const {nama_category} = req.body
            const update = await CategoryModel.editCategory(nama_category, id)
            res.json(update)
        } catch (error) {
            res.send(error.message)
        }
    }
}