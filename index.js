const fs = require('fs')
const path = require('path')
const go = require('./lib/function')
const Api = require('./lib')
const conn = new Api({
	token: 'YOUR_TOKEN'
})

console.log('Starting . . .')
conn.setMessageProvider(new Api.GetUpdateMessageProvider())
conn.start()
.then(() => {
    const CFonts  = require('cfonts')
		CFonts.say('TELEBOT', {
			font: 'chrome',
			align: 'center',
			colors: ['system']
	})
})

conn.on('update', async (m) => {
	global.cmd = Object.fromEntries(fs.readdirSync('./commands/').filter(v => v.endsWith('.js')).map(file => [ file, require('./commands/' + file) ]))
	let handler = require('./handler')
	await handler(m, conn)
	fs.watch(path.join(__dirname, 'commands'), (event, file) => {
		let js = file => file.endsWith('.js')
		if(js(file)) {
			let dir = './commands/' + file
		if (delete require.cache[require.resolve(dir)]) {
			if (!fs.existsSync(require.resolve(dir))) return delete global.cmd[file]
		}
    } else { 
			console.log(`requiring new plugin '${dir}'`)
    		global.cmd[file] = require(dir)
		}
	})
})

go.change('../handler.js', () =>{
	require('./handler.js')
	console.log('Handler was updated!')
})