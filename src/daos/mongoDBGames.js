import MongoClass from '../containers/mongoClass.js'
import { gamesSchema } from '../models/gamesSchema.js'

export class MongoDBGames extends MongoClass {
  constructor() {
    super('games', gamesSchema)
  }

  async findByTitle(title) {
    try {
      const game = await this.collection.findOne({ title })
      return game
    } catch (err) {
      throw new Error(err)
    }
  }
}