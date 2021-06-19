const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = new mongoose.Schema({
    local: {
        nombre: {type: String},
        lastname: {type: String},
        birthday: {type: Date},
        email: {type: String},
        password: {type: String}
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        password: String
      },
      twitter: {
        id: String,
        token: String,
        email: String,
        password: String
      },
      google: {
        id: String,
        token: String,
        email: String,
        password: String
      }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('User', userSchema)