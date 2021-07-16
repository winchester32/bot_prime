console.log('telegram bot is starting');
const fetch = require('node-fetch');
require('dotenv').config()



const { Telegraf }  = require('telegraf')

const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

//bot.use((ctx) => {
  //ctx.reply('Welcome ')
//})

//\\\\\\\\

bot.start((ctx) => {
  ctx.reply('bot has started!')

})

bot.help((ctx) => {
  ctx.reply('this bot has the following commands\n  -/start\n - /help\n - /jokes\n - /insults\n -/say ')

})


//bot.on('message', (ctx) => {

  //ctx.reply('bad text')

//})

bot.hears('hey', (ctx) => {

  ctx.reply('oh hello , how are you?')

})

bot.command('say', (ctx) =>{
  var msg = ctx.message.text
 var msgArray = msg.split(' ')
  //console.log(msgArray)
  msgArray.shift()
  var  newmsg = msgArray.join(' ')
  ctx.reply(newmsg)
})


bot.command('jokes', (ctx) => {
  getJoke()
  async function getJoke() {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke')
    const json = await response.json()
    //console.log(json)


    ctx.reply(json.setup)

    setTimeout(function () {
      ctx.reply(json.punchline)

    }, 4000)

  }


})

bot.command('insults', (ctx) => {
  getInsult()
  async function getInsult() {
    const response = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
    const json = await response.json()
    //console.log(json)
ctx.reply(json.insult)
  }
})
/*
bot.command('comics', (ctx) => {
  getComics()
  //var params = 
  async function getComics() {
    const response = await fetch('https://superheroapi.com/api/process.env.SUPERHERO_API/69/powerstats')
    const json = await response.json()
    console.log(json)
    //ctx.reply(json)




  }
})
*/



bot.launch()