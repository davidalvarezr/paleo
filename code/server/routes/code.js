var express = require('express');
var router = express.Router();

/* GET code listing. */
router.get('/', function(req, res, next) {
  res.send('TEST');
});

router.get('/validate/:id', function(req, res, next) {
    //process
  res.json({'code': 'success', 'points':req.params.id});
});

module.exports = router;
