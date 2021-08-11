exports.run = {
	usage: ['start'],
	async : function (m) {
		m.reply(m.id, text())
	}
}

const text = () => {
	return `
Selamat datang di Telebot, Commands :

/ig -- Instagram Downloader
/tiktok -- Tiktok Downloader (NoWM)

Bot ini dibuat dengan bahasa pemrograman Javascript (NodeJS)
Rest API : https://neoxr-api.herokuapp.com
Github : https://github.com/neoxr/TelebotV1
`
}