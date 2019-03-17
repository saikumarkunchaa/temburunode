var express = require('express');
var router = express.Router();
const multer = require('multer');
var path = require('path');

// storage engine
const storage = multer.diskStorage({
  destination: '../public/uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage }).single('file');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('pages/news/index');
});
router.get('/create', function (req, res, next) {
  res.render('pages/news/create', { success: req.session.success, errors: req.session.errors });
  req.session.errors = null;
});
router.post('/save', function (req, res, next) {
console.log(req.body);
  var title = req.body.title;
  var short_description = req.body.short_description;
  var long_description = req.body.long_description;
  var datetime = new Date();
  req.checkBody('title', 'Title is Required').notEmpty();
  req.checkBody('short_description', 'Short description Required').notEmpty();
  req.checkBody('long_description', 'Long description Required').notEmpty();
  req.checkBody('file', 'You must select an image.').notEmpty();

  upload(req, res, (err) => {
      if(err) {
        res.render('pages/news/create', {msg: err});
      } else {
        console.log(req.file);
      }
  });




  var errors = req.validationErrors();
  if (errors) {
    req.session.errors = errors;
    req.session.sussess = false;
    res.redirect('/news/create');
  } else {
    req.session.errors = false;
    res.redirect('/news');
  }

});
module.exports = router;
