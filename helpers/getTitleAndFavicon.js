const request = require('request')
const cheerio = require('cheerio')
const path = require('path')

module.exports = url => {
  return new Promise((resolve, reject) => {
    request(url, function(err, response, body) {
      const page = cheerio.load(body)
      const title = page('title').text() || 'untitled'
      let favicon =
        page('link[rel="shortcut icon"]').attr('href') ||
        page('link[rel="icon"]').attr('href') ||
        null

      var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
      var expressionWithoutHttp = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi

      const reg = new RegExp(expression)
      const regWithoutHTTP = new RegExp(expressionWithoutHttp)

      if (favicon.match(reg) && favicon.startsWith('http')) {
        resolve({
          title,
          favicon
        })
      }

      if (favicon.startsWith('//')) {
        favicon = favicon.substr(2, favicon.length - 1)
        const protocol = url.split('://')[0]
        favicon = `${protocol}://${favicon}`

        resolve({
          title,
          favicon
        })
      } else if (favicon.startsWith('/')) {
        favicon = favicon.substr(1, favicon.length - 1)
      }

      if (favicon) {
        if (
          favicon.match(regWithoutHTTP) ||
          (favicon.endsWith('png') || favicon.endsWith('ico'))
        ) {
          favicon = `${url}/${favicon}`
        } else {
          if (favicon.match(regWithoutHTTP)) {
            const protocol = url.split('://')[0]
            favicon = `${protocol}://${favicon}`
          } else if (!favicon.match(reg)) {
            let p = path.join(url, favicon)
            p = p.split('')
            p.forEach((word, index) => {
              if (word === '\\') {
                p[index] = '/'
              }
            })

            let newP = ''
            p.forEach(word => {
              if (word !== ',') {
                newP = newP + word
              }
            })
            newP = newP.split(':/')
            newP = `${newP[0]}://${newP[1]}`
            favicon = newP
          }
        }
      }

      resolve({
        title,
        favicon
      })
    })
  })
}
