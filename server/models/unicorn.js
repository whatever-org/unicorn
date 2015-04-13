var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResourceSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    birthday: {
        type: Date,
        required: true
    },
    weight: {
       type: Number,
       required: true,
       min: 0
    },
    gender: {
        type: String,
        required: true,
        match: /^[mf]$/
    },
    preferedFoods: [String],
    vampireKilled: {
        type: Number,
        min: 0
    },
});

ResourceSchema.static('findByName', function (name, callback) {
  return this.find({ name: name }, callback);
});

module.exports = mongoose.model('Unicorn', ResourceSchema);
