const categoryModeel = require('../model/Category')
const produkModel = require('../model/Produk')
const fs = require('fs-extra')
const path = require('path')
module.exports = {
    viewDashboard: (req,res) => {
        res.render('admin/dashboard')
    },
    viewCategory: async (req,res) => {
        let allertMessage = req.flash("allertMessage");
        let allertStatus = req.flash("allertStatus");
        const alert = { message: allertMessage, status: allertStatus };
        const data = await categoryModeel.getCategory()
        res.render('admin/category', {
            data,
            alert
        })
    },

    viewCategoryid: async (req,res) =>{
       try {
             const { id } = req.params
            const data =  await categoryModeel.getCategoryid(id)
            res.render("admin/category/updateCategory", {
              data,
            });
       } catch (error) {
           res.redirect('/admin/category')
       }
    },

    viewProdukid: async(req,res) => {
        try {
            const {id} = req.params
            const data = await produkModel.finOne(id)
            const dataCategory = await categoryModeel.getCategory();
            res.render('admin/produk/updateProduk', {data, dataCategory})
        } catch (error) {
            
        }
    },


    addCategory: async(req,res) => {
         try {
             req.flash("allertMessage", "success add category")
             req.flash("allertStatus", "success")
            const {nama_category} = req.body
             await categoryModeel.addCategory(nama_category)
            res.redirect('category')
        } catch (error) {
            res.send(error.message)
        }
    },
    deleteCategory: async(req,res) => {
        try {
            req.flash("allertMessage", "success delete category category")
            req.flash("allertStatus", "success")
            const {id} = req.params
            await categoryModeel.deleteCategory(id)
            res.redirect('/admin/category')
        } catch (error) {
            req.flash("allertMessage", `${err.message}`)
            req.flash("allertStatus", "danger")
            res.redirect('/admin/category')
        }
    },
    Updatecategory: async (req,res) => {
        try {
            req.flash("allertMessage", "success update category category")
            req.flash("allertStatus", "success")
            const getID = await categoryModeel.getCategory()
            const { id } = req.params;
            const { nama_category } = req.body;
            await categoryModeel.editCategory(nama_category, id);
            res.redirect('/admin/category')
        } catch (error) {
            req.flash("allertMessage", `${err.message}`)
            req.flash("allertStatus", "danger")
            res.redirect('/admin/category')
            
        }
    },

    viewProduk: async (req,res) => {
       try {
           let allertMessage = req.flash("allertMessage");
           let allertStatus = req.flash("allertStatus");
           const alert = { message: allertMessage, status: allertStatus };
           const dataCategory = await categoryModeel.getCategory()
            const data = await produkModel.getAll();
            res.render("admin/produk", { 
                data,
                dataCategory,
                alert
             });
       } catch (error) {
           res.send(error.message)
           
       }
    },

    addProduk: async(req,res) => {
       try {
           req.flash("allertMessage", "success add produk category")
           req.flash("allertStatus", "success")
           const { id_category, title, harga } = req.body;
           const image = req.file.filename;
           console.log(image, id_category, title, harga);
           const add = await produkModel.addPRoduct(
               title,
               harga,
               image,
               id_category
               );
               res.redirect('/admin/produk')
            } catch (error) {
        //    req.flash("allertMessage", `${error.message}`)
        //    req.flash("allertStatus", "danger")
           res.redirect('/admin/produk')
        }
    },
    
    deleteProduk: async(req,res)=> {
        try {
            req.flash("allertMessage", "success delete produk category")
            req.flash("allertStatus", "success")
            const {id} = req.params
            const finID = await produkModel.finOne(id)
            await fs.unlink(path.join(`public/images/${finID[0].image}`))
            const del = await produkModel.deleteProduk(id)
            res.redirect('/admin/produk')
        } catch (error) {
            req.flash("allertMessage", `${error.message}`)
            req.flash("allertStatus", "warning")
            res.redirect('/admin/produk')
        }
    }, 
    updateProduk: async (req,res) => {
         try {
             req.flash("allertMessage", "success update produk category")
             req.flash("allertStatus", "success")
            const { id } = req.params
            const { title, harga, idcategory } = req.body;
            const finID = await produkModel.finOne(id)
            const image = !req.file ? finID[0].image : req.file.filename
           console.log(image)
            if (image === finID[0].image  ) {
                 await produkModel.updateProduk(title, harga, image, id, idcategory)
                res.redirect('/admin/produk')
            } else {
                await fs.unlink(path.join(`public/images/${finID[0].image}`))
                 await produkModel.updateProduk(title, harga, image, id, idcategory)
                res.redirect('/admin/produk')

            }
        } catch (error) {
            res.send(error.message)
             req.flash("allertMessage", `${error.message}`)
             req.flash("allertStatus", "warning")
             res.redirect('/admin/produk')
        }
    }

}