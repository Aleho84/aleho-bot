export const readUser = function (req) {
    if (req.user) {
        return { name: req.user.name, image: req.user.image }
    } else {
        return { name: 'Anonymous', image: 'https://www.shareicon.net/data/128x128/2016/02/19/721756_people_512x512.png' }
    }
}