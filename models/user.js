const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 },
    lastClaim: { type: Date, default: null }
});

// Check if the model already exists to prevent overwriting it
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
