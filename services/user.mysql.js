const pool = require("../config/database")

module.exports = {
    create: (data,callBack) => {
        pool.query(
            `insert into registration(Email,Password)
                 values(?,?)`,
             [
                 data.Email,
                 data.Password
             ],
             (err,results,fields) => {
                 if(err) {
                     return callBack(err);
                 }
                 return callBack(null,results)
             }
        )
    }
};