const fetch = require('node-fetch')
exports.run = {
	usage: ['tik', 'tiktok'],
	async: async function (m, { status, args, isPrefix, command }) {
		try {
			if(!args || !args[0]) return m.reply(m.id, 'Example : ' + isPrefix + command + ' https://vt.tiktok.com/ZGJDTFmHd/')
			if(!args[0].match(/tiktok/gi)) return m.reply(m.id, status.invalid)
			await m.reply(m.id, status.getdata)
			let res = await fetch('https://neoxr-api.herokuapp.com/api/download/tiktok2?url=' + args[0] + '&apikey=yntkts')
			let json = await res.json()
			if(!json.status) return m.reply(m.id, status.fail)
			m.Vid(m.id, json.data.video)
		} catch {
			return m.reply(m.id, status.error)
		}
	},
	error: false
}