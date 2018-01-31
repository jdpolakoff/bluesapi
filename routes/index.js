var express = require('express')
var router = express.Router()
var request = require('request')
var cheerio = require('cheerio')

/* GET home page. */
router.get('/api', function(req, res, next) {

  var url = 'http://archive.wpfwfm.org/'

  request(url, function(err, resp, body){
    var $ = cheerio.load(body)
    var pods = []
    var buttons = $('.play_button')
    buttons.each(function(button){
      if ($(this).attr('title').indexOf('Blues') !== -1) {
        var pod = {
          title: $(this).attr('title'),
          mp3: $(this).attr('mp3')
        }
      } else {
        return null
      }
      pods.push(pod)
    })
    res.send(pods)
  })
})

module.exports = router;
