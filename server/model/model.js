/* eslint-disable no-undef */
const mongoose = require('mongoose');

const Contacts = mongoose.model('Contacts', {
    nama: {
        type: String,
        required: true,
    },
    nohp: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    }
});

module.exports = Contacts;