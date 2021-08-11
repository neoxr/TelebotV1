const fetch = require('node-fetch')
exports.run = {
	usage: ['ig'],
	async: async function (m, { status, args, isPrefix, command }) {
		try {
			if(!args || !args[0]) return m.reply(m.id, 'Example : ' + isPrefix + command + ' https://www.instagram.com/reel/CSUbxFiAYHt')
			if (!args[0].match(/https:\/\/www.instagram.com\/(p|reel|tv)/gi)) return m.reply(m.id, status.invalid)
			await m.reply(m.id, status.getdata)
			let res = await fetch('https://neoxr-api.herokuapp.com/api/download/ig?url=' + args[0] + '&apikey=yntkts')
			let json = await res.json()
			if(!json.status) return m.reply(m.id, status.fail)
			for(let i=0; i<json.data.length; i++) (json.data[i].type == 'mp4') ? m.Vid(m.id, json.data[i].url) : m.Img(m.id, json.data[i].url)
		} catch {
			return m.reply(m.id, status.error)
		}
	},
	error: false
}