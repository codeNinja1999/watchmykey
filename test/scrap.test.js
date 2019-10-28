const cheerio = require('cheerio')
const request = require('request')

request('https://mail.google.com/mail/u/', function(err, response, html) {
  console.log(page.html())
  //   console.log(
  //     page('title').text(),
  //     page('link[rel="shortcut icon"]').attr('href') ||
  //       page('link[rel="icon"]').attr('href') ||
  //       null
  //   )
})
