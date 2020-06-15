const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
    }
}, {
    timestamps: true
});

// se crea la colección users
module.exports = model('User', userSchema);
