const db = require('../connection/db')

module.exports = {
    getCategory:() => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM CATEGORY`, (err, result)=> {
                if(err){
                    reject(new Error(err))
                } else { 
                    resolve(result)
                }
            })
        })
    },

    getCategoryid: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM CATEGORY WHERE ID = ${id}`, (err, result)=> {
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },


    addCategory: (nama_category) => {
        return new Promise((resolve,reject)=> {
            db.query(`INSERT INTO CATEGORY(nama_kategori) VALUES('${nama_category}')`, (err, result)=> {
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    deleteCategory: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM CATEGORY WHERE ID = ${id}`, (err,result) => {
                if(err){
                    reject(new Error)
                } else {
                    resolve(result)
                }
            })
        })
    },

    editCategory: (nama_category, id) => {
        return new Promise((resolve, reject)=> {
            db.query(`UPDATE CATEGORY SET nama_kategori = '${nama_category}'  WHERE ID = ${id} `, (err,result)=> {
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }
}