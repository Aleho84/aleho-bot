import mongoose from 'mongoose'
import logger from '../utils/logger.js'

import { MONGOOSE_URI } from './constant.js'

export default async () => {
    try {
        await mongoose.connect(MONGOOSE_URI)
        const mongoServer = MONGOOSE_URI.split('@')
        logger.info(`[MONGODB]: 💾 Connected to MongoDB {${mongoServer[1]}}`)
    } catch (error) {
        logger.error(`[MONGODB]: ❌ ${error}`)
        process.exit(1)
    }
}