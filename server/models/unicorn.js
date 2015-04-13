var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResourceSchema = new Schema({
    name: String,
    birthday: Date,
    weight: Number,
    gender: String,
    PreferedFoods: String,
    VampireKilled: Number
});

module.exports = mongoose.model('Unicorn', ResourceSchema);
