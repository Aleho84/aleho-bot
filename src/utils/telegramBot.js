import tBot from 'node-telegram-bot-api'
import os from 'os'

import logger from '../utils/logger.js'
import { TELEGRAM_TOKEN } from '../config/constant.js'
import { secondsToString, bytesToMegabytes, findFreeGamesFunction } from './functions.js'

let HELP_MESSAGE = '-- Ayuda 📜 -- \n'
HELP_MESSAGE += '/Start : Activa el Bot. \n'
HELP_MESSAGE += '/Stop : Desactiva el Bot. \n'
HELP_MESSAGE += '/serverstatus : Estado de Aleho-Server. \n'
HELP_MESSAGE += '/freegames  : Juegos gratis!!!'

const BOT_INI = '-- Bot activado🤖 -- \n /help para obtener ayuda.'
const BOT_END = '-- Bot desactivado🤖 --'

const bot = new tBot(TELEGRAM_TOKEN, { polling: true })

let botStart = false

bot.onText(/\/(.+)/, (msg, match) => {
  let chatID = msg.chat.id
  let userID = msg.from.id
  let userName = msg.from.first_name
  let botCmd = match[1].toLowerCase()

  if (botStart) {
    switch (botCmd) {
      case 'start':
        botStart = true
        bot.sendMessage(chatID, BOT_INI)
        break

      case 'stop':
        botStart = false
        bot.sendMessage(chatID, BOT_END)
        break

      case 'serverstatus':
        const serverUp = secondsToString(os.uptime())
        const freeMem = parseInt(bytesToMegabytes(os.freemem()))
        const totalMem = parseInt(bytesToMegabytes(os.totalmem()))
        bot.sendMessage(chatID, `ALEHO-SERVER STATUS: \n El servidor esta online hace ${serverUp}. \n Tiene ${freeMem} MB de memoria libre de un total de ${totalMem} MB. \n y tu vieja en tanga...`)
        break

      case 'freegames':
        findFreeGames()
          .then(gameList => {
            gameList.forEach(game => {
              bot.sendMessage(chatID, `${game.url} \n ${game.title}: \n Finaliza: ${game.end_date} `)
            })
          })
        break

      case 'help':
        bot.sendMessage(chatID, HELP_MESSAGE)
        break

      default:
        bot.sendMessage(chatID, `"/${botCmd}" no entiendo ese comando. Puedes ver la ayuda con el comando /help`)
    }
  } else {
    switch (botCmd) {
      case 'start':
        botStart = true
        bot.sendMessage(chatID, BOT_INI)
        break
    }
  }
})

//sniffer de mensajes
bot.on('message', (msg) => {
  let mensajeLog = '[TELEGRAM BOT]  ID:' + msg.message_id + '  CHATID:' + msg.chat.id + '  USERID:' + msg.from.id + '  USERNAME:' + msg.from.first_name + '  MENSAJE:' + msg.text.toString()
  logger.info(mensajeLog)
})

//poll de errores
bot.on("polling_error", (msg) => {
  logger.info(msg)
})