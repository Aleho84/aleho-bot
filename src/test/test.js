import { findFreeGames } from '../utils/functions.js'

findFreeGames()
    .then(response => {
        console.log(response)
    })