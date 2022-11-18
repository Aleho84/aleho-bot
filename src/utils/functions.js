//Funcion para pasar los segundos a una cadena string legible (C dias HH:MM:SS)
export const secondsToString = function (seconds) {
    let days = Math.floor(seconds / 86400)

    let hour = Math.floor((seconds / 3600) % 24)
    hour = (hour < 10) ? '0' + hour : hour
    let minute = Math.floor((seconds / 60) % 60)
    minute = (minute < 10) ? '0' + minute : minute
    let second = seconds % 60
    second = (second.toFixed() < 10) ? '0' + second : second
    return days + ' dias ' + hour + ':' + minute + ':' + second
}

//Funcion para pasar de Bytes a MegaBytes
export const bytesToMegabytes = function (bytes) {
    return (bytes / 1024) / 1024
}

//Generar un numero aleatorio
export const getRandomInt = function (max) {
    return Math.floor((Math.random() * (max)) + 1)
}

//Genera un timestamp
export const timeStamp = function () {
    const newDate = new Date()
    const separadorDia = '-'
    const separadorHora = ':'

    return newDate.getFullYear() + separadorDia +
        (newDate.getMonth() + 1) + separadorDia +
        newDate.getDate() + " " +
        newDate.getHours() + separadorHora +
        newDate.getMinutes() + separadorHora +
        newDate.getSeconds()
}