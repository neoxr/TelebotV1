const fs = require('fs')
const go = require('./function')

exports.chats = async (m, conn) => {
	if(!m) return m
	if(m.message) {
		m.id = m.message.chat.id
		m.sender = m.message.from.first_name
		m.sender.id = m.message.from.id
		m.text = m.message.text
		m.date = m.message.date
	}
	
	m.reply = (id, text) => {
		return conn.sendMessage({
			chat_id: id,
			text: text
		})
	}

	m.Vid = async (id, url, stream) => {
		if(!stream) return conn.sendVideo({ 
			chat_id: id, 
			video: url
		})
		var name = Date.now() / 10000
		let file = name + '.mp4'
		go.download(url, './media/tmp/' + file, async () => {
		let media = fs.createReadStream('./media/tmp/' + file)
		await conn.sendVideo({ 
				chat_id: id, 
				video: media
			}).then(() => {
				fs.unlinkSync('./media/tmp/' + file)
			})
		})
	}

	m.Img = async (id, url, stream) => {
		if(!stream) return conn.sendPhoto({ 
			chat_id: id, 
			photo: url
		})
		var name = Date.now() / 10000
		let file = name + '.png'
		go.download(url, './media/tmp/' + file, async () => {
		let media = fs.createReadStream('./media/tmp/' + file)
		await conn.sendPhoto({ 
				chat_id: id, 
				photo: media
			}).then(() => {
				fs.unlinkSync('./media/tmp/' + file)
			})
		})
	}
}