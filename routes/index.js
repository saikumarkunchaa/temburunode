var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('pages/index', { title: 'Express' });
});
router.get('/sai', function(req, res) {
  res.render('sai', { title: 'SAI' });
});
module.exports = router;
