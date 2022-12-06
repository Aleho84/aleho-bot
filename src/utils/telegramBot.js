import tBot from 'node-telegram-bot-api'
import os from 'os'

import logger from '../utils/logger.js'
import { TELEGRAM_TOKEN } from '../config/constant.js'
import { secondsToString, bytesToMegabytes, findFreeGamesFunction, newFreeGamesFunction } from './functions.js'

let HELP_MESSAGE = '-- Ayuda 📜 -- \n'
HELP_MESSAGE += '/start : Activa el Bot. \n'
HELP_MESSAGE += '/stop : Desactiva el Bot. \n'
HELP_MESSAGE += '/serverstatus : Estado de Aleho-Server. \n'
HELP_MESSAGE += '/freegames  : Juegos gratis!!!'

const BOT_INI = '-- Bot activado🤖 -- \n /help para obtener ayuda.'
const BOT_END = '-- Bot desactivado🤖 --'

const bot = new tBot(TELEGRAM_TOKEN, { polling: true })

let botStart = false
let intervalObj

bot.onText(/\/(.+)/, (msg, match) => {
  let chatID = msg.chat.id
  let userID = msg.from.id
  let userName = msg.from.first_name
  let botCmd = match[1].toLowerCase()

  switch (botCmd) {
    case 'start':
      if (botStart) { break }

      //cada 1 dia, revisa si hay juegos nuevos y te lo informa.
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

    case 'serverstatus':
      if (!botStart) { break }
      const serverUp = secondsToString(os.uptime())
      const freeMem = parseInt(bytesToMegabytes(os.freemem()))
      const totalMem = parseInt(bytesToMegabytes(os.totalmem()))
      bot.sendMessage(chatID, `ALEHO-SERVER STATUS: \n El servidor esta online hace ${serverUp}. \n Tiene ${freeMem} MB de memoria libre de un total de ${totalMem} MB. \n y tu vieja en tanga...`)
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

    case 'help':
      if (!botStart) { break }
      bot.sendMessage(chatID, HELP_MESSAGE)
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