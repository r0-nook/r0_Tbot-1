const {gameOptions, r0_againOptions} = require('./r0_botT1-option');
const r0_TlgmApi = require('node-telegram-bot-api');
const token = '1813457410:AAFvjyZnIcW7j9IJJw9C4jqPCLyC6JQDdTs';
const bot = new r0_TlgmApi(token, {polling: true});
const charts = {}; //временный демонстрационный аналог базы данных для /game rand

const r0_startGame = async (chatId) => {
	await bot.sendMessage(chatId, 'Цифра? от 0 до 9');
	const r0_randNum = Math.floor(Math.random() * 10);
	charts[chatId] = r0_randNum;
	await bot.sendMessage(chatId, 'введи цифру', gameOptions);
}

const start = () => {
	bot.setMyCommands([
		{command: '/start', description: 'Активация и инфа о возможностях бота'},
		{command: '/info', description: 'инфа о боте'},
		{command: '/about', description: 'инфа о тебе'},
		{command: '/game', description: 'игра в рандом'},
	])

	bot.on('message', async msg => {
		const text = msg.text;
		const chatId = msg.chat.id;
		const r0_fName = msg.from.first_name == undefined ? msg.from.first_name = "<безИмянный>" : msg.from.first_name;
		const r0_lName = msg.from.last_name == undefined ? msg.from.last_name = "<безФамильный>" : msg.from.last_name;
		if(text === '/start') {
			await bot.sendSticker(chatId, `https://cdn.tlgrm.ru/stickers/696/3ad/6963ad3a-2019-32d2-ac85-34af3c84e50b/192/1.webp`)
			return bot.sendMessage(chatId, `Бот активирован и принимает комманды \n /start \n /info \n /about \n /game`)
		}
		if(text === '/info'){
			return bot.sendMessage(chatId, `Я тестовый бот созданный в процессе знакомства с нодой, сером R0_ (aka goldenlights)`)}
		if(text === '/about'){
			return bot.sendMessage(chatId, `твоё имя: ${r0_fName}, фамилия: ${r0_lName}`)}
		if(text === '/game'){
			return r0_startGame(chatId);}
		return bot.sendMessage(chatId, 'твоё сообщение это тупое говно тупого говна \n пиши по делу');
	})

	bot.on('callback_query', async msg => {
		const data = msg.data;
		const text = msg.text;
		const chatId = msg.message.chat.id;
		if(data === '/again'){return r0_startGame(chatId)}
		if(data === charts[chatId]){
			return bot.sendMessage(chatId, `Конгратуляцы ты верно выбрал цифру ${charts[chatId]}`, r0_againOptions)
		}else{
			return bot.sendMessage(chatId, `Сраный лузер, ты проебался, число победителя ${charts[chatId]}`, r0_againOptions)
		}
		bot.sendMessage(chatId, `твой выбор ${data}`)
	})
}

start();