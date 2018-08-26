const express = require('express');
const router = express.Router();
const youtubedl = require('youtube-dl');
const fs = require('fs');
const uuid = require('uuidv4');

/* GET users listing. */
router.get('/version', function(req, res, next) {
  res.send("V1");
});

router.get('/videoInfo', function(req, res, next) {
  const url = req.query.url;
  const userAgent = req.headers['user-agent'];
  const fileLocation = `cookies_${uuid()}.txt`;

  const options = ['--no-playlist', '--skip-download', '--print-json', `--user-agent=${userAgent}`, `--cookies=${fileLocation}`, ];
  youtubedl.getInfo(url, options, function(err, info){
    if(err) res.send(err);
    fs.readFile(fileLocation, 'utf8', function(err, contents) {
      if(err) res.send(err);
      res.json({info: info, cookie: contents});
    });
    fs.unlinkSync(fileLocation);
  });
})



module.exports = router;
