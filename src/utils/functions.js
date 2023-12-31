import axios from "axios"
import logger from '../utils/logger.js'
import { gamesDao } from '../daos/index.js'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

//Funcion para pasar los segundos a una cadena string legible (C dias HH:MM:SS)
export const secondsToString = function (seconds) {
    try {
        let days = Math.floor(seconds / 86400)
        let hour = Math.floor((seconds / 3600) % 24)
        hour = (hour < 10) ? '0' + hour : hour
        let minute = Math.floor((seconds / 60) % 60)
        minute = (minute < 10) ? '0' + minute : minute
        let second = seconds % 60
        second = (second < 10) ? '0' + second.toFixed(0) : second.toFixed(0)
        return days + ' dias ' + hour + ':' + minute + ':' + second
    } catch (error) {
        return { error: `${error}` }
    }
}

//Funcion para pasar de Bytes a MegaBytes
export const bytesToMegabytes = function (bytes) {
    try {
        return (bytes / 1024) / 1024
    } catch (error) {
        return { error: `${error}` }
    }
}

//Generar un numero aleatorio
export const getRandomInt = function (max) {
    try {
        return Math.floor((Math.random() * (max)) + 1)
    } catch (error) {
        return { error: `${error}` }
    }
}

//Genera un timestamp
export const timeStamp = function () {
    try {
        const newDate = new Date()
        const separadorDia = '-'
        const separadorHora = ':'

        return newDate.getFullYear() + separadorDia +
            (newDate.getMonth() + 1) + separadorDia +
            newDate.getDate() + " " +
            newDate.getHours() + separadorHora +
            newDate.getMinutes() + separadorHora +
            newDate.getSeconds()
    } catch (error) {
        return { error: `${error}` }
    }
}

//Devuelve un Array con info de juegos gratis
export const findFreeGamesFunction = async () => {
    try {
        const url = 'https://www.gamerpower.com/api/filter?platform=epic-games-store.steam'
        const options = {}
        const response = await axios.get(url, options)
        if (response.status == 200) {
            let newElement = []
            response.data.forEach(element => {
                if (element.status == 'Active' && element.type == 'Game') {
                    newElement.push({
                        game_id: element.id,
                        url: element.open_giveaway_url,
                        title: element.title,
                        thumbnail: element.thumbnail,
                        status: element.status,
                        type: element.type,
                        end_date: element.end_date
                    })
                }
            })
            return newElement
        } else {
            return { message: `status code: ${response.status}` }
        }
    } catch (error) {
        return { error: `${error}` }
    }
}

//Devuelve un Array con juegos nuevos
export const newFreeGamesFunction = async () => {
    try {
        const newFreeGameList = await findFreeGamesFunction()
        const oldFreeGameList = await gamesDao.getAll()
        let foundGamesList = []
        let foundGame = []

        if ('error' in newFreeGameList) {
            return newFreeGameList
        }

        newFreeGameList.forEach(newGame => {
            foundGame = oldFreeGameList.find(oldGame => oldGame._doc.game_id === newGame.game_id)
            if (foundGame === undefined) {
                logger.info(`[TELEGRAM BOT]: New Game found: ${newGame.title}`)
                foundGamesList.push(newGame)
                gamesDao.create(newGame)
            }
        })

        return foundGamesList
    } catch (error) {
        return { error: `${error}` }
    }
}

//Devuelve los logs del servidor
export const showLogsFunction = async () => {
    try {
        const __filename = fileURLToPath(import.meta.url)
        const __dirname = path.dirname(__filename)
        const file = path.join(__dirname, '../logs/info.log')
        let jsonLogList = []

        const read = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' })

        if (read.length === 0) { return [] }

        const arrayLog = read.split(/\r\n|\r|\n/)

        arrayLog.forEach(arrayLogElement => {
            const line = arrayLogElement.split(' - ')
            const jsonLine = {
                timestamp: line[0],
                level: ` ${line[1]} - `,
                message: line[2]
            }
            if (!(line[1] == undefined)) {
                jsonLine.level = jsonLine.level.toUpperCase()
                jsonLogList.push(jsonLine)
            }
        })

        return jsonLogList
    } catch (error) {
        logger.error(`[LOGGER]: ❌ ${error}`)
        return []
    }
}

//Devuelve la cotizacion del dolar y el euro
export const dolarHoyFunction = async () => {
    const urlRequest = `https://api.bluelytics.com.ar/v2/latest`
    const response = await axios.get(urlRequest)
    return response.data
}