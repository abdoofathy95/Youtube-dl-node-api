var express = require('express');
var router = express.Router();
var youtubedl = require('youtube-dl');

/* GET users listing. */
router.get('/version', function(req, res, next) {
  res.send("V1");
});

router.get('/videoInfo', function(req, res, next) {
  const url = req.query.url;
  const options = ['--no-playlist', '--skip-download', '--print-json'];
  youtubedl.getInfo(url, options, function(err, info){
    if(err) res.send(err);
    res.send(info);
  });
})



module.exports = router;
