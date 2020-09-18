const connect = require('../config/connectionMongodb')




function SaveUserDetails(data) {
    return new Promise((resolve, reject) => {
        connect.dbo.collection('Customer1').find({
            email: data.email
        }).toArray((err, res) => {
            if (err) {
                reject(err)
            }
            else if (res.length == 0) {
                connect.dbo.collection('Customer1').insertOne(data, (err, res) => {
                    if (err) {
                        console.log(err)
                        reject(err)
                    }
                    else {
                        // console.log("this ------->", res);
                        resolve(res.insertedCount);
                    }
                })
            }
            else {
                resolve(0)
            }
        });
    });
}
function updateDetails(data) {
    return new Promise((resolve, reject) => {
        connect.dbo.collection('customer1').updateOne({
            email: data.email
        }, { $push: { data: insert_data } }, (err, res) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(res.modifiedCount);
            }
        });
    });

}
function findData(data) {
    console.log("_____________________________________--",data);
    return new Promise((resolve, reject) => {
        connect.dbo.collection('Customer1').find({ email: data.email }).toArray((err, res) => {
            if (err) {
                reject(err)
            }
            else {
                console.log("===================================",res);
                resolve(res);
            }
        });
    })
}





module.exports = {
    SaveUserDetails: SaveUserDetails,
    updateDetails:updateDetails,
    findData: findData

}
