import mongoose from "mongoose"

export const gamesSchema = new mongoose.Schema({
    id: {
        id: int,
        default: 0
    },
    url: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    },
    end_date: {
        type: String,
        default: ''
    }
})