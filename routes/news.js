var express = require('express');
var router = express.Router();
const multer = require('multer');
var path = require('path');
var Newscontroller = require('../controller/news');

// storage engine
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

let upload = multer({ storage: storage }).single('file');

var validator = (req, res, next) => {
  req.checkBody('title', 'Title is Required').notEmpty();
  req.checkBody('short_description', 'Short description Required').notEmpty();
  req.checkBody('long_description', 'Long description Required').notEmpty();
  //req.checkBody('file', 'You must select an image.').notEmpty();

  req.asyncValidationErrors().then(function () {
    next();
  }).catch(function (errors) {
    console.log('errors were came');
    return false;
  });

}
/* GET */
router.get('/', function (req, res, next) {
  res.render('pages/news/index');
});
// router.get('/create', function (req, res, next) {
//   res.render('pages/news/create', { success: req.session.success, errors: req.session.errors });
//   req.session.errors = null;
// });
router.post('/create', Newscontroller.NewsCreate);
router.get('/list', Newscontroller.NewsList);
router.post('/save', upload,  function (req, res, next) {
  console.log(req.body.data);
  const Bodydata = req.body;
  req.body  = JSON.stringify(req.body);
  // var title = Bodydata.title;
  // var short_description = req.body.short_description;
  // var long_description = req.body.long_description;
  // var datetime = new Date();
  console.log(req.body);
  req.checkBody('title', 'Title is Required').notEmpty();
  req.checkBody('short_description', 'Short description Required').notEmpty();
  req.checkBody('long_description', 'Long description Required').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    req.session.errors = errors;
    req.session.sussess = false;
    res.redirect('/news/create');
  } else {
    req.session.errors = false;
    Bodydata.file = req.file.filename;
    Newscontroller.addNews(Bodydata);
    res.redirect('/news');
  }

});
module.exports = router;
