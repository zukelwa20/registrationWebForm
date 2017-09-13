const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
    mongoose.connect(mongoUrl, function() {

    });
mongoose.connect(mongoUrl, {useMongoClient: true})

    var greetedNames = mongoose.model('greetedNames', {
        name: String,
        counter: Number
    });


    return {
        greetedNames
    }
}
