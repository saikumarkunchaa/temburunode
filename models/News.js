"use strict";
const db = require('../dbConnection');
module.exports = {
    newsList: (result) => {
        db.query("select * from news",function(err, res) {
            if(err) {
                result(null, err);
            } else {
                result(null, res);
            }

        })
    },
    newsCreate: (Postdata,result) => {
        let query = "INSERT INTO `news` (title,small_description,long_description,image_path,created_date,updated_date,created_by,updated_by) VALUES('"+Postdata['title']+"','"+Postdata['short_desc']+"','"+Postdata['long_desc']+"','"+Postdata['image_path']+"',"+Postdata['datetime']+","+Postdata['datetime']+",'"+Postdata['created_by']+"','"+Postdata['updated_by']+"')";
                 db.query(query,(err,res) => {
                     if(err) {
                         result(null,err);
                     } else {
                         let succ = 'success';
                         result(null,res.succ);
                     }
                 });
    }
}