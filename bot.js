console.log('telegram bot is starting');
const fetch = require('node-fetch');
require('dotenv').config()



const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

//bot.use((ctx) => {
//ctx.reply('Welcome ')
//})

//\\\\\\\\

bot.start((ctx) => {
  ctx.reply('bot has started!')

})

bot.help((ctx) => {
  ctx.reply('this bot has the following commands\n  -/start\n - /help\n - /jokes\n - /insults\n -/superhero\n - /say ')

})


//bot.on('message', (ctx) => {

//ctx.reply('bad text')

//})

bot.hears('hey', (ctx) => {

  ctx.reply('oh hello , how are you?')

})

bot.command('say', (ctx) => {
  var msg = ctx.message.text
  var msgArray = msg.split(' ')
  //console.log(msgArray)
  msgArray.shift()
  var newmsg = msgArray.join(' ')
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

    }, 3500)

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


bot.command('superhero', (ctx) => {
  var textMsg = ctx.message.text
  //console.log("telegram text: "+textMsg)

  var msgArray = textMsg.split(' ')
  msgArray.shift()
  textMsg = msgArray.join(' ')
  //console.log("telegram command removed: "+textMsg)

  getComics(textMsg)

  async function getComics() {
    var url = "https://superheroapi.com/api/process.env.ACCESS_TOKEN/search/" + encodeURIComponent(textMsg)
    console.log("url: " + url)
    const response = await fetch(url)
    const json = await response.json()

    console.log(JSON.stringify(json))



    for (i in json.results) {
      var superhero = json.results[i];

      var reply = "Name : " + superhero.name +
        "\n\n*Power Stats*" +
        "\nInteligence : " + superhero.powerstats.intelligence + "\nStrength : " + superhero.powerstats.strength +
        "\nSpeed : " + superhero.powerstats.speed + "\nDurability : " + superhero.powerstats.durability +
        "\nPower : " + superhero.powerstats.power +
        "\n\n*Biography*" +
        "\nFull name : " + superhero.biography["full-name"] + "\nAlter Egos : " + superhero.biography["alter-egos"] +
        "\nAliases : " + superhero.biography.aliases + "\nPlace of birth : " + superhero.biography["place-of-birth"] +
        "\n\n*Appearance*" +
        "\nGender : " + superhero.appearance.gender +
        "\nRace : " + superhero.appearance.race +
        "\nHeight : " + superhero.appearance.height[0] + ", " + superhero.appearance.height[1] +
        "\nWeight : " + superhero.appearance.weight[0] + ", " + superhero.appearance.weight[1] +
        "\nEye Colour : " + superhero.appearance["eye-color"] +
        "\nHair Colour : " + superhero.appearance["hair-color"] +
        "\n\n*Connections*" +
        "\nGroup Affiliations : " + superhero.connections["group-affiliation"] +
        "\nRelatives : " + superhero.connections.relatives

      ctx.replyWithMarkdown(reply)
    }

  }


})




bot.launch()