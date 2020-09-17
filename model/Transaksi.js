const db = require('../connection/db')

module.exports = {
  insertMaster: (invoices, orders, amount) => {
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
  insertDetail: (id_transaksi, id_product, id_category, qty, price) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO HISTORY_DETAIL (ID_TRANSAKSI, ID_PRODUCT, ID_CATEGORY, QTY, PRICE) VALUES('${id_transaksi}' ,'${id_product}', '${id_category}', ${qty},  ${price} )`,
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
};