import { newFreeGames } from '../utils/functions.js'

newFreeGames()
    .then(response => {
        console.log(response)
    })