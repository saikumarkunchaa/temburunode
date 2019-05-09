const db = require('../dbConnection');
const News = require('../models/News');
module.exports = {
    NewsList: (req,res) => {
        News.newsList(function(err, data) {
            if(err) {
                res.send(err);
            } else {
                const result = {res : data,status: 'success'};
                res.send(result);
            }
        });
    },
    NewsCreate: (req,res) => {
        var data  = req.body;
       // res.send(data);
        var title = data.news_title;
        var short_desc = data.news_short_description;
        var long_desc = data.news_long_description;
        var filename = 'image';
        var created_by = 1;
        var update_by = 1;
        var datetime = "NOW()";
        var Postdata = {"title": title, "short_desc": short_desc, "long_desc": long_desc, 'image_path': filename, "created_by":created_by,"updated_by":update_by,"datetime":datetime}; 
        News.newsCreate(Postdata,function(err, data) {
            if(err) {
                res.send(err);
            } else {
                const result = {status: 'success', number: 200};
                res.send(result);
            }
        });
    }
}


