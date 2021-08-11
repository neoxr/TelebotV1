let extra = require('./lib/extra.js')
module.exports = async (m, conn) => {
try {
	extra.chats(m, conn)
	const status = {
		invalid: `URL is Invalid!`,
		getdata: `Scraping metadata . . .`,
		fail: `Can't get metadata!`,
		error: `Error!`,
		errorF: `Sorry this feature is in error.`,
	}
	let prefix = new RegExp('^[' + ('/!#+.') + ']')
	let isPrefix
	if (m.text && m.text.length != 1 && (isPrefix = (prefix.exec(m.text) || '')[0])) {
		let args = m.text.replace(isPrefix, '').split` `.filter(v=>v)
		let command = args.shift().toLowerCase()
	for (let n in global.cmd) {
		let cmd = global.cmd[n].run
		let turn = cmd.usage instanceof RegExp ? cmd.usage.test(command) : cmd.usage instanceof Array ? cmd.usage.includes(command) : cmd.usage instanceof String ? cmd.usage == command : false
		if (!turn) continue
		if (typeof cmd.error !== 'undefined' && cmd.error) {
			m.reply(m.id, status.errorF)
			continue
		} 
		cmd.async(m, { status, args, isPrefix, command })
		break
			}
		}
	} catch(e) {
		console.log(e.message)
	}
}