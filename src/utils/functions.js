import axios from "axios"
import logger from '../utils/logger.js'
import { gamesDao } from '../daos/index.js'

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

export const showLogsFunction = async () => {
    try {
        return [
            {
                timestamp: '[2022-12-06 12:41:52]',
                level: 'info',
                message: '🌱 ENVIRONMENT=development'
            },
            {
                timestamp: '[2022-12-06 12:41:52]',
                level: 'info',
                message: '💻 Server started on port 8080. 🪛 Worker PID: 23096. MODO:fork'
            },
            {
                timestamp: '[2022-12-06 12:41:52]',
                level: 'info',
                message: '[MONGODB]: 💾 Connected to MongoDB {192.168.0.3:27017/aleho-bot}'
            }
        ]
    } catch (error) {
        return { error: `${error}` }
    }
}
