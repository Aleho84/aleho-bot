import tBot from 'node-telegram-bot-api'
import os from 'os'

import logger from '../utils/logger.js'
import { TELEGRAM_TOKEN } from '../config/constant.js'

import {
  secondsToString,
  bytesToMegabytes,
  findFreeGamesFunction,
  newFreeGamesFunction,
  showLogsFunction,
  dolarHoyFunction
} from './functions.js'

let HELP_MESSAGE = '-- Ayuda 📜 -- \n'
HELP_MESSAGE += '/start : Activate bot. \n'
HELP_MESSAGE += '/stop : Deactivate bot. \n'
HELP_MESSAGE += '/freegames : Free games! \n'
HELP_MESSAGE += '/serverstatus : Show aleho-server status. \n'
HELP_MESSAGE += '/showlogs : Show Bot logs.'
HELP_MESSAGE += '/dolarhoy : Show Dolar price in Argentina market.'

const BOT_INI = '-- Bot activado🤖 -- \n /help para obtener ayuda.'
const BOT_END = '-- Bot desactivado🤖 --'

const bot = new tBot(TELEGRAM_TOKEN, { polling: true })

let botStart = true
let intervalObj

//cada 1 dia, revisa si hay juegos nuevos y te lo informa.
const intervalInit = () => {
  if (!intervalObj) {
    intervalObj = setInterval(() => {
      newFreeGamesFunction()
        .then(gameList => {
          gameList.forEach(game => {
            bot.sendMessage(chatID, `${game.url} \n ${game.title}: \n Finaliza: ${game.end_date} `)
          })
        })
    }, 1000 * 60 * 60)
  }
}

intervalInit()

bot.onText(/\/(.+)/, (msg, match) => {
  let chatID = msg.chat.id
  let userID = msg.from.id
  let userName = msg.from.first_name
  let botCmd = match[1].toLowerCase()

  switch (botCmd) {
    case 'start':
      if (botStart) { break }

      intervalInit()

      botStart = true
      bot.sendMessage(chatID, BOT_INI)
      break

    case 'stop':
      if (!botStart) { break }
      clearInterval(intervalObj)
      intervalObj = null

      botStart = false
      bot.sendMessage(chatID, BOT_END)
      break

    case 'freegames':
      if (!botStart) { break }
      findFreeGamesFunction()
        .then(gameList => {
          gameList.forEach(game => {
            bot.sendMessage(chatID, `${game.url} \n ${game.title}: \n Finaliza: ${game.end_date} `)
          })
        })
      break

    case 'serverstatus':
      if (!botStart) { break }
      const serverUp = secondsToString(os.uptime())
      const freeMem = parseInt(bytesToMegabytes(os.freemem()))
      const totalMem = parseInt(bytesToMegabytes(os.totalmem()))
      bot.sendMessage(chatID, `ALEHO-SERVER STATUS: \n El servidor esta online hace ${serverUp}. \n Tiene ${freeMem} MB de memoria libre de un total de ${totalMem} MB. \n y tu vieja en tanga...`)
      break

    case 'showlogs':
      showLogsFunction()
        .then(logs => {
          logs.forEach(log => {
            bot.sendMessage(chatID, `${log.timestamp} - ${log.level} \n ${log.message} `)
          })
        })
      break

    case 'help':
      if (!botStart) { break }
      bot.sendMessage(chatID, HELP_MESSAGE)
      break

    case 'dolarhoy':
      if (!botStart) { break }
      dolarHoyFunction()
        .then(response => {
          let blueBuy = response.blue.value_buy.toFixed(2)
          let blueSell = response.blue.value_sell.toFixed(2)

          let blueOlBuy = response.oficial.value_buy.toFixed(2)
          let blueOSell = response.oficial.value_sell.toFixed(2)

          let msg = `Dolar Oficial 🧑‍✈️ \n -Compra:  $${blueOlBuy}\n -Venta:      $${blueOSell}\n \n`
          msg = msg + `Dolar Blue 💵 \n -Compra:  $${blueBuy}\n -Venta:      $${blueSell}`

          bot.sendMessage(chatID, msg)
        })
      break

    default:
      if (!botStart) { break }
      bot.sendMessage(chatID, `"/${botCmd}" no entiendo ese comando. Puedes ver la ayuda con el comando /help`)
  }
})

//sniffer de mensajes
bot.on('message', (msg) => {
  let mensajeLog = `[TELEGRAM BOT] ID: ${msg.message_id}  CHATID: ${msg.chat.id}  USERID: ${msg.from.id}  USERNAME: ${msg.from.first_name}  MENSAJE: ${msg.text.toString()}  BOTSTARTED: ${botStart}`
  logger.info(mensajeLog)
})

//poll de errores
bot.on("polling_error", (msg) => {
  logger.error(`[TELEGRAM BOT]: ${msg}`)
})