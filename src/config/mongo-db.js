import mongoose from 'mongoose'
import logger from '../utils/logger.js'
import 'dotenv/config'

import { MONGOOSE_URI } from './constant.js'

const config = {
    mongoDB: {
        URL: MONGOOSE_URI,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    }
}

export default async () => {
    try {
        await mongoose.connect(config.mongoDB.URL, config.mongoDB.options)
        const mongoServer = MONGOOSE_URI.split('@')
        logger.info(`[MONGODB]: 💾 Connected to MongoDB {${mongoServer[1]}}`)
    } catch (error) {
        logger.error(`[MONGODB]: ⚠ MongoDB Error: ${error}`)
    }
}