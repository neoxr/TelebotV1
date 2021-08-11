const request = require('request')
const fs = require('fs')

const download = (uri, filename, callback) => {
		request.head(uri, function (err, res, body) {
		request(uri).pipe(fs.createWriteStream(filename)).on('close', callback)
	})
}

const change = (module, cross) => {
	require('fs').watchFile(require.resolve(module), () => {
	 delete require.cache[require.resolve(module)]
	 if (cross) cross(module)
    })
}

exports.change = change
exports.download = download