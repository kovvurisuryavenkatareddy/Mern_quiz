const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
});

const ScoreModel = mongoose.model("scores", ScoreSchema);

module.exports = ScoreModel;
