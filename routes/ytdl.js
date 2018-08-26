const express = require('express');
const router = express.Router();
const { exec } = require('child_process');


/* GET users listing. */
router.get('/version', function(req, res, next) {
  res.send("V1");
});

router.get('/videoInfo', function(req, res, next) {
  const url = req.query.url;
  const userAgent = req.headers['user-agent'];

  const options = '--no-playlist --skip-download --print-json';


  exec(`./bin/youtube-dl ${url} ${options}`, (err, stdout, stderr) => {
    if (err) {
      if (err.code === 1){
        // res.send(stderr);
        res.send("Invalid url");
      } else {
        res.send("Please provide a valid url")
      }
      return;
    }
    res.send(stdout)
    // the *entire* stdout and stderr (buffered)
  });
  // youtubedl.getInfo(url, options, function(err, info){
  //   if(err) res.send(err);
  //     res.send(info);
  // });

})



module.exports = router;
