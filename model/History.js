const db = require('../connection/db')

module.exports = {
  getHIstory: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM history`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  getHIstoryid: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM history WHERE ID = ${id}`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },

  InsertHistory: (invoices, orders, amount) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO HISTORY (INVOICES, ORDERS, AMOUNT) VALUES('${invoices}', '${orders}', '${amount}')`,
        (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  deleteId: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM HISTORY WHERE ID = ${id}`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },

  updateId: (invoices, orders, amount, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE HISTORY SET INVOICES = '${invoices}', ORDERS='${orders}', amount = ${amount} WHERE ID = '${id}'`, (err, result) => {
          if(err) {
              reject(err)
          } else{
              resolve(result)
          }
      } );
    });
  },

 


};