var express = require('express');
var router = express.Router();

/* GET code listing. */
router.get('/', function(req, res, next) {
  res.send('TEST');
});

router.get('/validate/:id', function(req, res, next) {
    //process
    console.log("test")
  points = parseInt(decypher(req.params.id))
  console.log("points= ", points)
  res.json({'code': 'success', 'points': points});
});


function decypher(code) {
  var points = "";
  for (var i = 0; i < code.length; i+=2) {
    var one = code.charAt(i).charCodeAt(0);
    var two = code.charAt(i+1).charCodeAt(0);
    points += "" + Math.abs(one-two);
  }
  return points
}



module.exports = router;
