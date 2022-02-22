/* eslint-disable no-undef */
const express = require('express');
const { body, check } = require('express-validator');

const app = express();
const route = express.Router();

const controllerContact = require('../controller/controller');
const Contacts = require('../model/model');

// load parser
app.use(express.urlencoded({ extended: true }));

route.get('/', (req, res) => {
    res.render('home');
});

route.get('/about', (req, res) => {
    res.render('about');
});

route.get('/contact', controllerContact.tampilData);

route.get('/contact/add', controllerContact.formTambah);

route.post('/contact', [
    body('nama').custom(async (value) => {
        const duplikat = await Contacts.findOne({ nama: value });
        if (duplikat) {
            throw new Error('Nama contact sudah digunakan!');
        }
        return true;
    }), 
    check('email', 'Email tidak valid!').isEmail(), 
    check('nohp', 'No HP tidak valid!').isMobilePhone('id-ID')
], controllerContact.saveData);

route.delete('/contact', controllerContact.deleteData);

route.get('/contact/edit/:nama', controllerContact.formEdit);

route.put('/contact', [
    body('nama').custom(async (value, { req }) => {
        const duplikat = await Contacts.findOne({ nama: value });
        if (value !== req.body.oldNama && duplikat) {
            throw new Error('Nama contact sudah digunakan!');
        }
        return true;
    }), 
    check('email', 'Email tidak valid!').isEmail(), 
    check('nohp', 'No HP tidak valid!').isMobilePhone('id-ID')
], controllerContact.updateData);

route.get('/contact/:nama', controllerContact.tampilDetailData);

module.exports = route;