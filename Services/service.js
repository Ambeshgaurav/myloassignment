const connectMysql = require('../config/ConfigMysql');

function signupDataMysql(data) {

    return new Promise((resolve, reject) => {
        connectMysql.service.connection.query("select email from Home where email=?", [data.email], function (err, rows) {
            if (err) {
                reject(err)
            }
            else if (rows && rows.length) {
                resolve(0)
            }
            else {
                var sql = ("insert into Home (name,email,password,phone_number,role) values(?,?,?,?,?)");
                connectMysql.service.connection.query(sql, [ data.name, data.email, data.password, data.phone,data.role], function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(rows)
                    }

                });
            }


        });

    });

}

function loginDataMysql(data) {
    return new Promise((resolve, reject) => {
        connectMysql.service.connection.query("select email ,password from Home where email=?", [data.email], function (err, rows) {
            if (err) {
                reject(err)
            }
            else {
                resolve(rows)
            }
        });
    });
}



function ReadDataMysql(data) {
    return new Promise((resolve, reject) => {
        connectMysql.service.connection.query("select * from Home where email=?", [data], function (err, rows) {
            if (err) {
                reject(err)
            }
            else {
                resolve(rows)
            }
        });
    });
}
function updateDataMysql(data) {
    return new Promise((resolve, reject) => {
        var sql = ("update Home set name=?, password=?,phone_number=? where email=?")
        connectMysql.service.connection.query(sql, [data.name, data.password, data.phone_number,data.email], function (err, rows) {
            if (err) {
                reject(err)
            }
            else {
                resolve(rows)
            }
        });
    });
}
function deleteUserMysql(data) {
    return new Promise((resolve, reject) => {
        var sql = ("update Home set isdefault=?where email=?")
        connectMysql.service.connection.query(sql, ['0',data], function (err, rows) {
            if (err) {
                reject(err)
            }
            else {
                resolve(rows)
            }
        });
    });
}




module.exports =
{
    loginDataMysql: loginDataMysql,
    signupDataMysql: signupDataMysql,
    ReadDataMysql:ReadDataMysql,
    updateDataMysql:updateDataMysql,
    deleteUserMysql:deleteUserMysql

}