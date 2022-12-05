import mongoose from "mongoose"

export const gamesSchema = new mongoose.Schema({
    game_id: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    end_date: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: ''
    }
})